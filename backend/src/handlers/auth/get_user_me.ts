import { postgres } from '../../database'
import { authenticateUser, getAccessToken, refreshAccessToken } from '../../middlewares/with_auth'
import type { BunRequest } from 'bun'
import type { YandexProfile, GoogleProfile } from '../../domains/auth'

const DEFAULT_AVATAR_ID = '131652443'
const getYandexUserAvatarUrl = (avatarId: string | undefined) => {
  return `https://avatars.yandex.net/get-yapic/${avatarId ?? DEFAULT_AVATAR_ID}/islands-200`
}

/**
 * Получает информацию о пользователе от провайдера
 */
const fetchUserProfile = async (
  accessToken: string,
  provider: string
): Promise<{ id: string; displayName: string; email?: string; avatar?: string } | null> => {
  try {
    if (provider === 'yandex') {
      const response = await fetch('https://login.yandex.ru/info?format=json', {
        headers: {
          Authorization: `OAuth ${accessToken}`
        }
      })

      if (!response.ok) {
        return null
      }

      const profile = (await response.json()) as YandexProfile

      return {
        id: profile.id,
        displayName: profile.display_name ?? profile.real_name ?? profile.login,
        email: profile.default_email,
        avatar: getYandexUserAvatarUrl(profile.default_avatar_id)
      }
    } else if (provider === 'google') {
      const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (!response.ok) {
        return null
      }

      const profile = (await response.json()) as GoogleProfile

      return {
        id: profile.id,
        displayName: profile.name ?? profile.email,
        email: profile.email,
        avatar: profile.picture
      }
    }

    return null
  } catch {
    return null
  }
}

/**
 * Получает информацию о текущем пользователе
 * Проверяет access_token и при необходимости обновляет его
 */
export const getUserMeHandler = async (req: BunRequest): Promise<Response> => {
  try {
    // Проверяем токен
    let userId = await authenticateUser(req)

    // Если токен протух, пытаемся обновить
    if (!userId) {
      // Получаем старый токен из cookie
      const oldAccessToken = getAccessToken(req)

      if (!oldAccessToken) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
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
          headers: { 'Content-Type': 'application/json' }
        })
      }

      userId = userResult[0].id as string
      const provider = userResult[0].provider as string

      // Обновляем токен
      const newAccessToken = await refreshAccessToken(userId, provider)

      if (!newAccessToken) {
        return new Response(JSON.stringify({ error: 'Failed to refresh token' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        })
      }

      // Получаем информацию о пользователе с новым токеном
      const profile = await fetchUserProfile(newAccessToken, provider)

      if (!profile) {
        return new Response(JSON.stringify({ error: 'Failed to get user info' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        })
      }

      // Устанавливаем новый cookie
      const setCookieValue = `access_token=${newAccessToken}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax; HttpOnly; Secure`

      return new Response(
        JSON.stringify({
          id: profile.id,
          displayName: profile.displayName,
          email: profile.email,
          avatar: profile.avatar
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': setCookieValue
          }
        }
      )
    }

    // Токен валидный - получаем информацию о пользователе
    const accessToken = getAccessToken(req)

    if (!accessToken) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Получаем провайдера из БД
    const userResult = await postgres`
      SELECT provider FROM users 
      WHERE id = ${userId}
    `

    if (userResult.length === 0) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const provider = userResult[0].provider as string

    // Получаем профиль пользователя
    const profile = await fetchUserProfile(accessToken, provider)

    if (!profile) {
      return new Response(JSON.stringify({ error: 'Failed to get user info' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    return new Response(
      JSON.stringify({
        id: profile.id,
        displayName: profile.displayName,
        email: profile.email,
        avatar: profile.avatar
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    console.error('Get user me error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
