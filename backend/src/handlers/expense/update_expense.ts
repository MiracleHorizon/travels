import type { BunRequest } from 'bun'
import { postgres } from '../../database'

interface UpdateExpenseDto {
  title?: string
  amount?: number
  description?: string
  date?: string
  category?: string
}

export const updateExpenseHandler = async (req: BunRequest) => {
  try {
    const { expenseId } = req.params
    const body = (await req.json()) as UpdateExpenseDto

    const result =
      await postgres`UPDATE expenses SET title = ${body.title}, amount = ${body.amount}, description = ${body.description}, date = ${body.date}, category = ${body.category}, updated_at = NOW() WHERE id = ${expenseId} RETURNING *`

    if (result.count === 0) {
      return new Response(JSON.stringify({ error: 'Expense not found' }), {
        status: 404
      })
    }

    return new Response(JSON.stringify(result[0]), {
      status: 200
    })
  } catch (error) {
    console.error('Error updating expense:', error)

    return new Response(JSON.stringify({ error: 'Failed to update expense' }), {
      status: 500
    })
  }
}
