import type { BunRequest } from 'bun'
import { postgres } from '../../database'

export const deleteExpenseHandler = async (req: BunRequest) => {
  try {
    const { expenseId } = req.params

    const result = await postgres`DELETE FROM expenses WHERE id = ${expenseId}`
    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ error: 'Expense not found' }), {
        status: 404
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
}
