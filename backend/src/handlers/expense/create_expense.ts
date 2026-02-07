import { randomUUIDv7, type BunRequest } from 'bun'
import { postgres } from '../../database'

interface CreateExpenseDto {
  title: string
  amount: number
  description: string
  date: string
  category: string
}

export const createExpenseHandler = async (req: BunRequest) => {
  try {
    const { travelId } = req.params
    const { title, amount, description, date, category } = (await req.json()) as CreateExpenseDto

    const travel = await postgres`SELECT * FROM travels WHERE id = ${travelId}`
    if (travel.rowCount === 0) {
      return new Response(JSON.stringify({ error: 'Travel not found' }), {
        status: 404
      })
    }

    // TODO: Поддержка выбора валюты
    const currency = 'RUB'

    const expenseId = randomUUIDv7()
    const expense =
      await postgres`INSERT INTO travel_expenses (id, travel_id, title, amount, currency, category, date, description) VALUES (${expenseId}, ${travelId}, ${title}, ${amount}, ${currency}, ${category}, ${date}, ${description}) RETURNING *`

    return new Response(JSON.stringify(expense[0]), {
      status: 201
    })
  } catch (error) {
    console.error('Error creating expense:', error)
    return new Response(JSON.stringify({ error: 'Failed to create expense' }), {
      status: 500
    })
  }
}
