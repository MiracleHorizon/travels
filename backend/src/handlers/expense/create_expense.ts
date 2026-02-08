import { randomUUIDv7 } from 'bun'
import { postgres } from '../../database'
import { withAuth } from '../../middlewares/with_auth'

interface CreateExpenseDto {
  title: string
  amount: number
  description: string
  date: string
  category: string
}

export const createExpenseHandler = withAuth(async req => {
  const userId = req.userId

  try {
    const { travelId } = req.params
    const { title, amount, description, date, category } = (await req.json()) as CreateExpenseDto

    // Проверяем что путешествие существует и принадлежит пользователю
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

    // TODO: Поддержка выбора валюты
    const currency = 'RUB'

    const expenseId = randomUUIDv7()
    const expense =
      await postgres`INSERT INTO travel_expenses (id, travel_id, title, amount, currency, category, date, description) VALUES (${expenseId}, ${travelId}, ${title}, ${amount}, ${currency}, ${category}, ${date}, ${description}) RETURNING *`

    return new Response(JSON.stringify(expense[0]), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error('Error creating expense:', error)
    return new Response(JSON.stringify({ error: 'Failed to create expense' }), {
      status: 500
    })
  }
})
