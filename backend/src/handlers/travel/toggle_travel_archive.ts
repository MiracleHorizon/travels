import { postgres } from '../../database'
import { withAuth } from '../../middlewares/with_auth'

export const toggleTravelArchiveHandler = withAuth(async req => {
  const userId = req.userId

  try {
    const { travelId } = req.params
    const body = (await req.json()) as { is_archived: boolean }
    const isArchived = body.is_archived

    // Обновляем только если путешествие принадлежит пользователю
    const result = await postgres`
      UPDATE travels 
      SET is_archived = ${isArchived} 
      WHERE id = ${travelId} AND user_id = ${userId}
      RETURNING *
    `

    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ error: 'Travel not found or access denied' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    return new Response(JSON.stringify(result[0]), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error('Error toggling travel archive:', error)
    return new Response(JSON.stringify({ error: 'Failed to toggle travel archive' }), {
      status: 500
    })
  }
})
