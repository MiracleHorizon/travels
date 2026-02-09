import { postgres } from '../../database'
import { withAuth } from '../../middlewares/with_auth'

interface UpdateExpenseDto {
  title?: string
  amount?: number
  description?: string
  date?: string
  category?: string
  link?: string
}

export const updateExpenseHandler = withAuth(async req => {
  const userId = req.userId

  try {
    const { expenseId } = req.params
    const body = (await req.json()) as Partial<UpdateExpenseDto>

    // Обновляем расход только если он принадлежит путешествию пользователя
    const result = await postgres`
      UPDATE travel_expenses 
      SET 
        title = ${body.title}, 
        amount = ${body.amount}, 
        description = ${body.description}, 
        date = ${body.date}, 
        category = ${body.category}, 
        link = ${body.link ?? null}, 
        updated_at = NOW() 
      WHERE id = ${expenseId} 
        AND travel_id IN (
          SELECT id FROM travels WHERE user_id = ${userId}
        )
      RETURNING *
    `

    if (result.count === 0) {
      return new Response(JSON.stringify({ error: 'Expense not found or access denied' }), {
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
    console.error('Error updating expense:', error)

    return new Response(JSON.stringify({ error: 'Failed to update expense' }), {
      status: 500
    })
  }
})
