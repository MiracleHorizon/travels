import type { BunRequest } from 'bun'
import { postgres } from '../../database'

interface UpdateTravelDto {
  name?: string
  description?: string
  startDate?: string
  endDate?: string
  tags?: string[]
}

export const updateTravelHandler = async (req: BunRequest) => {
  try {
    const { id } = req.params
    const body = (await req.json()) as UpdateTravelDto

    const result =
      await postgres`UPDATE travels SET name = ${body.name}, description = ${body.description}, start_date = ${body.startDate}, end_date = ${body.endDate}, tags = ${body.tags}, updated_at = NOW() WHERE id = ${id} RETURNING *`

    if (result.count === 0) {
      return new Response(JSON.stringify({ error: 'Travel not found' }), {
        status: 404
      })
    }

    return new Response(JSON.stringify(result[0]), {
      status: 200
    })
  } catch (error) {
    console.error('Error updating travel:', error)

    return new Response(JSON.stringify({ error: 'Failed to update travel' }), {
      status: 500
    })
  }
}
