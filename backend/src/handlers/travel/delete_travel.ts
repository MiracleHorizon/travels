import { postgres } from '../../database'
import { withAuth } from '../../middlewares/with_auth'

export const deleteTravelHandler = withAuth(async req => {
  const userId = req.userId

  try {
    const { travelId } = req.params

    // Удаляем только если путешествие принадлежит пользователю
    const result = await postgres`
      DELETE FROM travels 
      WHERE id = ${travelId} AND user_id = ${userId}
    `

    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ error: 'Travel not found or access denied' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    return new Response(null, {
      status: 200
    })
  } catch (error) {
    console.error('Error deleting travel:', error)
    return new Response(JSON.stringify({ error: 'Failed to delete travel' }), {
      status: 500
    })
  }
})
