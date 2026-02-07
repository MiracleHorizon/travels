import type { BunRequest } from 'bun'
import { postgres } from '../../database'

export const getExpensesListHandler = async (req: BunRequest) => {
  try {
    const { travelId } = req.params
    const expenses =
      await postgres`SELECT * FROM travel_expenses WHERE travel_id = ${travelId} ORDER BY created_at ASC`

    return new Response(JSON.stringify(expenses))
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
}
