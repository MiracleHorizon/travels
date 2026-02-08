import { postgres } from '../database'
import type { BunRequest } from 'bun'
import {
  YANDEX_OAUTH_CONFIG,
  type YandexProfile,
  type YandexTokensResponse,
  GOOGLE_OAUTH_CONFIG,
  type GoogleProfile,
  type GoogleTokensResponse
} from '../domains/auth'

export interface AuthenticatedRequest extends BunRequest {
  userId: string
}

type Handler = (req: AuthenticatedRequest) => Promise<Response> | Response

/**
 * Middleware для проверки авторизации
 * Извлекает userId из access_token в cookie
 * Автоматически обновляет токен, если он протух
 */
export const withAuth = (handler: Handler) => {
  return async (req: BunRequest): Promise<Response> => {
    // Проверяем токен
    let userId = await authenticateUser(req)
    let newAccessToken: string | null = null

    // Если токен протух, пытаемся обновить
    if (!userId) {
      // Получаем старый токен из cookie
      const oldAccessToken = getAccessToken(req)

      if (!oldAccessToken) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }

      // Получаем userId из БД по старому токену
      const userResult = await postgres`
        SELECT id, provider FROM users 
        WHERE access_token = ${oldAccessToken}
      `

      if (userResult.length === 0) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }

      userId = userResult[0].id as string
      const provider = userResult[0].provider as string

      // Обновляем токен
      newAccessToken = await refreshAccessToken(userId, provider)

      if (!newAccessToken) {
        return new Response(JSON.stringify({ error: 'Failed to refresh token' }), {
          status: 401,
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }
    }

    // Добавляем userId в request
    const authenticatedReq = req as AuthenticatedRequest
    authenticatedReq.userId = userId

    // Выполняем handler
    const response = await handler(authenticatedReq)

    // Если токен был обновлён, устанавливаем новый cookie
    if (newAccessToken) {
      const newCookie = `access_token=${newAccessToken}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax; HttpOnly; Secure`

      // Создаём новый Response с обновлённым cookie
      const newResponse = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
      })

      newResponse.headers.set('Set-Cookie', newCookie)

      return newResponse
    }

    return response
  }
}

export interface AuthenticatedRequest extends BunRequest {
  userId: string
}

/**
 * Проверяет access_token и возвращает userId
 * Если токен протух, пытается обновить через refresh_token
 */
export const authenticateUser = async (req: BunRequest): Promise<string | null> => {
  const accessToken = getAccessToken(req)

  if (!accessToken) {
    return null
  }

  try {
    // Сначала находим пользователя по токену, чтобы узнать провайдера
    const userResult = await postgres`
      SELECT id, provider FROM users 
      WHERE access_token = ${accessToken}
    `

    if (userResult.length === 0) {
      return null
    }

    const userId = userResult[0].id as string
    const provider = userResult[0].provider as string

    // Проверяем токен через API провайдера
    if (provider === 'yandex') {
      const response = await fetch('https://login.yandex.ru/info?format=json', {
        headers: {
          Authorization: `OAuth ${accessToken}`
        }
      })

      if (response.ok) {
        const userInfo = (await response.json()) as YandexProfile
        return userInfo.id
      }
    } else if (provider === 'google') {
      const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (response.ok) {
        const userInfo = (await response.json()) as GoogleProfile
        return userInfo.id
      }
    }

    // Токен протух - пытаемся обновить через refresh_token
    const newAccessToken = await refreshAccessToken(userId, provider)

    if (newAccessToken) {
      return userId
    }

    return null
  } catch {
    return null
  }
}

/**
 * Получает access_token из cookie
 */
export const getAccessToken = (req: BunRequest): string | null => {
  const cookie = req.headers
    .get('cookie')
    ?.split('; ')
    .find(cookie => cookie.startsWith('access_token='))

  return cookie?.split('=')[1] || null
}

/**
 * Обновляет access_token через refresh_token
 */
export const refreshAccessToken = async (
  userId: string,
  provider: string
): Promise<string | null> => {
  try {
    // Получаем refresh_token из БД
    const result = await postgres`
      SELECT refresh_token FROM users 
      WHERE id = ${userId} AND provider = ${provider}
    `

    if (result.length === 0 || !result[0].refresh_token) {
      return null
    }

    const refreshToken = result[0].refresh_token as string

    let accessToken: string
    let newRefreshToken: string | undefined

    if (provider === 'yandex') {
      // Обновляем токен через Яндекс API
      const response = await fetch('https://oauth.yandex.ru/token', {
        method: 'POST',
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          client_id: YANDEX_OAUTH_CONFIG.clientId,
          client_secret: YANDEX_OAUTH_CONFIG.clientSecret
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })

      if (!response.ok) {
        return null
      }

      const tokens = (await response.json()) as YandexTokensResponse
      accessToken = tokens.access_token
      newRefreshToken = tokens.refresh_token
    } else if (provider === 'google') {
      // Обновляем токен через Google API
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          client_id: GOOGLE_OAUTH_CONFIG.clientId,
          client_secret: GOOGLE_OAUTH_CONFIG.clientSecret
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })

      if (!response.ok) {
        return null
      }

      const tokens = (await response.json()) as GoogleTokensResponse
      accessToken = tokens.access_token
      newRefreshToken = tokens.refresh_token
    } else {
      return null
    }

    // Обновляем токены в БД
    const updateResult = await postgres`
      UPDATE users 
      SET 
        access_token = ${accessToken},
        refresh_token = ${newRefreshToken || refreshToken},
        updated_at = NOW()
      WHERE id = ${userId} AND provider = ${provider}
    `

    if (updateResult.rowCount === 0) {
      return null
    }

    return accessToken
  } catch (error) {
    console.error('Failed to refresh token:', error)
    return null
  }
}
