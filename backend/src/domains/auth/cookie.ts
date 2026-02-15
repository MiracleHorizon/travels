/**
 * Создаёт строку Set-Cookie для access_token.
 * Secure отключается в dev - иначе cookie не отправляется по HTTP (localhost).
 */
const buildAuthCookie = (accessToken: string, maxAgeSeconds: number): string => {
  const isSecure = process.env.NODE_ENV === 'production'
  const securePart = isSecure ? '; Secure' : ''

  return `access_token=${accessToken}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax; HttpOnly${securePart}`
}

export const buildAuthCookieForLogin = (accessToken: string, expiresIn: number): string =>
  buildAuthCookie(accessToken, expiresIn)

export const buildAuthCookieForRefresh = (accessToken: string): string =>
  buildAuthCookie(accessToken, 60 * 60 * 24 * 30) // 30 дней
