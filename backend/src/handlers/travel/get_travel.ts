import { postgres } from '../../database'
import { withAuth } from '../../middlewares/with_auth'

export const getTravelHandler = withAuth(async req => {
  const userId = req.userId

  try {
    const { travelId } = req.params

    // Получаем путешествие только если оно принадлежит пользователю
    const result = await postgres`
      SELECT id, name, start_date, end_date, description, is_archived, created_at, updated_at, tags
      FROM travels 
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

    const photos =
      await postgres`SELECT url, description FROM travel_photos WHERE travel_id = ${travelId} ORDER BY created_at ASC`

    const travel = {
      ...result[0],
      status: result[0].start_date < new Date() ? 'past' : 'upcoming',
      photos
    }

    return new Response(JSON.stringify(travel), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error('Error fetching travel:', error)

    return new Response(JSON.stringify({ error: 'Failed to fetch travel' }), {
      status: 500
    })
  }
})
