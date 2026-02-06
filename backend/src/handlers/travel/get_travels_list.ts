import type { BunRequest } from 'bun'
import { postgres } from '../../database'

export const getTravelsListHandler = async (_req: BunRequest) => {
  try {
    const travels = await postgres`SELECT * FROM travels ORDER BY created_at ASC`

    return new Response(JSON.stringify(travels))
  } catch (error) {
    console.error('Error fetching travels:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch travels' }), {
      status: 500
    })
  }
}
