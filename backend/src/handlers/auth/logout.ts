import type { BunRequest } from 'bun'

/**
 * Выход пользователя из системы.
 * Удаляет cookie с access_token.
 */
export const logoutHandler = async (req: BunRequest): Promise<Response> => {
  try {
    // Удаляем cookie, устанавливая Max-Age=0
    const setCookieValue = 'access_token=; Path=/; Max-Age=0; SameSite=Lax; HttpOnly; Secure'

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': setCookieValue
      }
    })
  } catch (error) {
    console.error('Logout error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
