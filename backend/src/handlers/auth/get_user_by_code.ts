import { postgres } from '../../database'
import type { BunRequest } from 'bun'
import {
  YANDEX_OAUTH_CONFIG,
  type YandexProfile,
  type YandexTokensResponse,
  GOOGLE_OAUTH_CONFIG,
  type GoogleProfile,
  type GoogleTokensResponse,
  buildAuthCookieForLogin
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
 * Обменивает OAuth code на токены Google
 */
const exchangeCodeForGoogleTokens = async (
  code: string,
  redirectUri: string = GOOGLE_OAUTH_CONFIG.redirectUri
): Promise<GoogleTokensResponse> => {
  const tokensQuery = new URLSearchParams({
    client_id: GOOGLE_OAUTH_CONFIG.clientId,
    client_secret: GOOGLE_OAUTH_CONFIG.clientSecret,
    code,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code'
  })

  const response = await fetch('https://oauth2.googleapis.com/token', {
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

  const tokens = (await response.json()) as GoogleTokensResponse

  if (!tokens.access_token) {
    throw new Error('Invalid tokens response')
  }

  return tokens
}

/**
 * Получает информацию о пользователе Google по access_token
 */
const fetchGoogleUserInfo = async (accessToken: string): Promise<GoogleProfile> => {
  const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  if (!response.ok) {
    throw new Error(`Failed to get user info: ${response.status}`)
  }

  return response.json() as Promise<GoogleProfile>
}

/**
 * Handler для авторизации по OAuth code
 *
 * Фронт отправляет code, полученный от провайдера
 * Бэк обменивает code на токены и сохраняет их в БД
 */
export const getUserByCodeHandler = async (req: BunRequest) => {
  const { provider } = req.params

  try {
    const body = (await req.json()) as { code: string; redirect_uri?: string }

    if (!body.code) {
      return new Response(JSON.stringify({ error: 'Code is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    let userId: string
    let displayName: string
    let email: string | undefined
    let avatar: string | undefined
    let accessToken: string
    let refreshToken: string | undefined
    let expiresIn: number

    if (provider === 'yandex') {
      // redirect_uri должен совпадать с тем, что был при переходе на Яндекс
      const redirectUri = body.redirect_uri ?? YANDEX_OAUTH_CONFIG.redirectUri

      // 1. Обмениваем code на токены
      const tokens = await exchangeCodeForTokens(body.code, redirectUri)

      // 2. Получаем информацию о пользователе
      const userInfo = await fetchYandexUserInfo(tokens.access_token)

      userId = userInfo.id
      displayName = userInfo.display_name ?? userInfo.real_name ?? userInfo.login
      email = userInfo.default_email
      avatar = userInfo.default_avatar_id
      accessToken = tokens.access_token
      refreshToken = tokens.refresh_token
      expiresIn = tokens.expires_in
    } else if (provider === 'google') {
      // redirect_uri должен совпадать с тем, что был при переходе на Google
      const redirectUri = body.redirect_uri ?? GOOGLE_OAUTH_CONFIG.redirectUri

      // 1. Обмениваем code на токены
      const tokens = await exchangeCodeForGoogleTokens(body.code, redirectUri)

      // 2. Получаем информацию о пользователе
      const userInfo = await fetchGoogleUserInfo(tokens.access_token)

      userId = userInfo.id
      displayName = userInfo.name ?? userInfo.email
      email = userInfo.email
      avatar = userInfo.picture
      accessToken = tokens.access_token
      refreshToken = tokens.refresh_token
      expiresIn = tokens.expires_in
    } else {
      return new Response(JSON.stringify({ error: `Unsupported provider: ${provider}` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // 3. Создаём или обновляем пользователя в БД
    await postgres`
      INSERT INTO users (id, provider, access_token, refresh_token, created_at, updated_at)
      VALUES (
        ${userId}, 
        ${provider}, 
        ${accessToken},
        ${refreshToken ?? null},
        NOW(),
        NOW()
      )
      ON CONFLICT (provider, id) 
      DO UPDATE SET
        access_token = EXCLUDED.access_token,
        refresh_token = EXCLUDED.refresh_token,
        updated_at = NOW()
    `

    // 4. Создаём запись настроек по умолчанию, если её ещё нет
    await postgres`
      INSERT INTO user_settings (user_id, measurement_unit, time_format, created_at, updated_at)
      VALUES (${userId}, 'metric', '24h', NOW(), NOW())
      ON CONFLICT (user_id) DO NOTHING
    `

    return new Response(
      JSON.stringify({
        user: {
          id: userId,
          displayName,
          email,
          avatar
        }
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': buildAuthCookieForLogin(accessToken, expiresIn)
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
