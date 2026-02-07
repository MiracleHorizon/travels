import type { BunRequest } from 'bun'
import { postgres } from '../../database'

export const getTravelHandler = async (req: BunRequest) => {
  try {
    const { travelId } = req.params
    const result = await postgres`SELECT * FROM travels WHERE id = ${travelId}`

    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ error: 'Travel not found' }), {
        status: 404
      })
    }

    const travel = {
      ...result[0],
      status: result[0].start_date < new Date() ? 'past' : 'upcoming'
    }

    return new Response(JSON.stringify(travel), {
      status: 200
    })
  } catch (error) {
    console.error('Error fetching travel:', error)

    return new Response(JSON.stringify({ error: 'Failed to fetch travel' }), {
      status: 500
    })
  }
}
