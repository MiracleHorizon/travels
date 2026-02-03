import type { BunRequest } from 'bun'
import { corsHeaders } from '../../cors'
import { postgres } from '../../database'

export const getTravelsListHandler = async (req: BunRequest) => {
  try {
    const travels = await postgres`SELECT * FROM travels`

    return new Response(JSON.stringify(travels), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    })
  } catch (error) {
    console.error('Error fetching travels:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch travels' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    })
  }
}
