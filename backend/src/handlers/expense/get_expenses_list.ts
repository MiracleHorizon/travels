import { postgres } from '../../database'
import { withAuth } from '../../middlewares/with_auth'

export const getExpensesListHandler = withAuth(async req => {
  const userId = req.userId

  try {
    const { travelId } = req.params

    // Проверяем что путешествие принадлежит пользователю
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

    const expenses =
      await postgres`SELECT * FROM travel_expenses WHERE travel_id = ${travelId} ORDER BY created_at ASC`

    return new Response(JSON.stringify(expenses), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error('Error fetching expenses:', error)
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch expenses'
      }),
      {
        status: 500
      }
    )
  }
})
