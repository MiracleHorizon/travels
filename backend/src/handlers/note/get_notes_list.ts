import { postgres } from '../../database'
import { withAuth } from '../../middlewares/with_auth'

export const getNotesListHandler = withAuth(async req => {
  const userId = req.userId

  try {
    const { travelId } = req.params

    const travel = await postgres`
      SELECT * FROM travels 
      WHERE id = ${travelId} AND user_id = ${userId}
    `

    if (travel.rowCount === 0) {
      return new Response(JSON.stringify({ error: 'Travel not found or access denied' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    const notes =
      await postgres`SELECT id, travel_id, date, content, created_at, updated_at FROM travel_notes WHERE travel_id = ${travelId} ORDER BY date DESC`

    return new Response(JSON.stringify(notes), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error('Error fetching notes:', error)
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch notes'
      }),
      {
        status: 500
      }
    )
  }
})
