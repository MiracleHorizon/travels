import type { BunRequest } from 'bun'
import { postgres } from '../../database'
import { corsHeaders } from '../../cors'

export const deleteTravelHandler = async (req: BunRequest) => {
  console.log('deleteTravelHandler', req)
  try {
    const { id } = req.params

    const result = await postgres`DELETE FROM travels WHERE id = ${id}`
    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ error: 'Travel not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    }

    return new Response(null, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    })
  } catch (error) {
    console.error('Error deleting travel:', error)
    return new Response(JSON.stringify({ error: 'Failed to delete travel' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    })
  }
}
