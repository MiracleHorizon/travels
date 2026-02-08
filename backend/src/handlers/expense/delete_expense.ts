import { postgres } from '../../database'
import { withAuth } from '../../middlewares/with_auth'

export const deleteExpenseHandler = withAuth(async req => {
  const userId = req.userId

  try {
    const { expenseId } = req.params

    // Удаляем расход только если он принадлежит путешествию пользователя
    const result = await postgres`
      DELETE FROM travel_expenses 
      WHERE id = ${expenseId} 
        AND travel_id IN (
          SELECT id FROM travels WHERE user_id = ${userId}
        )
    `

    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ error: 'Expense not found or access denied' }), {
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
    console.error('Error deleting expense:', error)
    return new Response(JSON.stringify({ error: 'Failed to delete expense' }), {
      status: 500
    })
  }
})
