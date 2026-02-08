import { postgres } from '../../database'
import type { BunRequest } from 'bun'
import {
  YANDEX_OAUTH_CONFIG,
  type YandexProfile,
  type YandexTokensResponse
} from '../../domains/auth'

/**
 * Обменивает OAuth code на токены.
 * redirect_uri должен совпадать с тем, что был при редиректе на Яндекс.
 */
const exchangeCodeForTokens = async (
  code: string,
  redirectUri: string = YANDEX_OAUTH_CONFIG.redirectUri
): Promise<YandexTokensResponse> => {
  const tokensQuery = new URLSearchParams({
    client_id: YANDEX_OAUTH_CONFIG.clientId,
    client_secret: YANDEX_OAUTH_CONFIG.clientSecret,
    code,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code'
  })

  const response = await fetch('https://oauth.yandex.ru/token', {
    method: 'POST',
    body: tokensQuery,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    }
  })

  if (!response.ok) {
    const body = await response.text()
    let message = `Failed to get tokens: ${response.status} ${response.statusText}`
    try {
      const json = JSON.parse(body) as { error_description?: string; error?: string }
      if (json.error_description) message += ` — ${json.error_description}`
      else if (json.error) message += ` — ${json.error}`
    } catch {
      if (body) message += ` — ${body}`
    }
    throw new Error(message)
  }

  const tokens = (await response.json()) as YandexTokensResponse

  if (!tokens.access_token || !tokens.refresh_token) {
    throw new Error('Invalid tokens response')
  }

  return tokens
}

/**
 * Получает информацию о пользователе по access_token
 */
const fetchYandexUserInfo = async (accessToken: string): Promise<YandexProfile> => {
  const response = await fetch('https://login.yandex.ru/info?format=json', {
    headers: {
      Authorization: `OAuth ${accessToken}`
    }
  })

  if (!response.ok) {
    throw new Error(`Failed to get user info: ${response.status}`)
  }

  return response.json() as Promise<YandexProfile>
}

/**
 * Handler для авторизации по OAuth code
 *
 * Фронт отправляет code, полученный от Яндекса
 * Бэк обменивает code на токены и сохраняет их в БД
 */
export const getUserByCodeHandler = async (req: BunRequest) => {
  try {
    const body = (await req.json()) as { code: string; redirect_uri?: string }

    if (!body.code) {
      return new Response(JSON.stringify({ error: 'Code is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // redirect_uri должен совпадать с тем, что был при переходе на Яндекс (обычно origin фронта + /login/callback)
    const redirectUri = body.redirect_uri ?? YANDEX_OAUTH_CONFIG.redirectUri

    // 1. Обмениваем code на токены
    const tokens = await exchangeCodeForTokens(body.code, redirectUri)

    // 2. Получаем информацию о пользователе
    const userInfo = await fetchYandexUserInfo(tokens.access_token)

    // 3. Создаём или обновляем пользователя в БД
    await postgres`
      INSERT INTO users (id, provider, access_token, refresh_token, created_at, updated_at)
      VALUES (
        ${userInfo.id}, 
        'yandex', 
        ${tokens.access_token},
        ${tokens.refresh_token},
        NOW(),
        NOW()
      )
      ON CONFLICT (provider, id) 
      DO UPDATE SET
        access_token = EXCLUDED.access_token,
        refresh_token = EXCLUDED.refresh_token,
        updated_at = NOW()
    `

    // 4. Устанавливаем access_token в HttpOnly cookie
    const cookie = `access_token=${tokens.access_token}; Path=/; Max-Age=${tokens.expires_in}; SameSite=Lax; HttpOnly; Secure`

    return new Response(
      JSON.stringify({
        user: {
          id: userInfo.id,
          displayName: userInfo.display_name ?? userInfo.real_name ?? userInfo.login,
          email: userInfo.default_email,
          avatar: userInfo.default_avatar_id
        }
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': cookie
        }
      }
    )
  } catch (error) {
    console.error('Auth by code error:', error)
    const message = error instanceof Error ? error.message : 'Authentication failed'

    return new Response(JSON.stringify({ error: message }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
