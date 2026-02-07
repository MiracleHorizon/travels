import type { BunRequest } from 'bun'
import { postgres } from '../../database'

export const toggleTravelArchiveHandler = async (req: BunRequest) => {
  try {
    const { travelId } = req.params
    const body = (await req.json()) as { is_archived: boolean }
    const isArchived = body.is_archived

    const result =
      await postgres`UPDATE travels SET is_archived = ${isArchived} WHERE id = ${travelId} RETURNING *`

    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ error: 'Travel not found' }), {
        status: 404
      })
    }

    return new Response(JSON.stringify(result[0]), {
      status: 200
    })
  } catch (error) {
    console.error('Error toggling travel archive:', error)
    return new Response(JSON.stringify({ error: 'Failed to toggle travel archive' }), {
      status: 500
    })
  }
}
