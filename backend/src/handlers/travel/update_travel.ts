import { postgres } from '../../database'
import { withAuth } from '../../middlewares/with_auth'

interface UpdateTravelDto {
  name?: string
  description?: string
  startDate?: string
  endDate?: string
  tags?: string[]
}

export const updateTravelHandler = withAuth(async req => {
  const userId = req.userId

  try {
    const { travelId } = req.params
    const body = (await req.json()) as UpdateTravelDto

    // Обновляем только если путешествие принадлежит пользователю
    const result = await postgres`
      UPDATE travels 
      SET 
        name = ${body.name}, 
        description = ${body.description}, 
        start_date = ${body.startDate}, 
        end_date = ${body.endDate}, 
        tags = ${body.tags}, 
        updated_at = NOW() 
      WHERE id = ${travelId} AND user_id = ${userId}
      RETURNING *
    `

    if (result.count === 0) {
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
    console.error('Error updating travel:', error)

    return new Response(JSON.stringify({ error: 'Failed to update travel' }), {
      status: 500
    })
  }
})
