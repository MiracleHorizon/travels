import {
  createTravelHandler,
  deleteTravelHandler,
  getTravelHandler,
  getTravelsListHandler,
  updateTravelHandler
} from './handlers/travel'
import { corsHeaders, injectCORS } from './cors'
import { createExpenseHandler } from './handlers/expense/create_expense'
import { getExpensesListHandler } from './handlers/expense/get_expenses_list'
import { deleteExpenseHandler } from './handlers/expense/delete_expense'
import { updateExpenseHandler } from './handlers/expense/update_expense'

const server = Bun.serve({
  port: 4200,
  routes: injectCORS(
    {
      // Путешествие
      '/api/v1/travels': {
        POST: createTravelHandler,
        GET: getTravelsListHandler
      },
      '/api/v1/travels/:id': {
        GET: getTravelHandler,
        PATCH: updateTravelHandler,
        DELETE: deleteTravelHandler
      },
      // Расходы
      '/api/v1/expenses/:travelId': {
        POST: createExpenseHandler,
        GET: getExpensesListHandler
      },
      '/api/v1/expenses/:expenseId': {
        PATCH: updateExpenseHandler,
        DELETE: deleteExpenseHandler
      }
    },
    corsHeaders
  ),
  fetch: () => {
    return new Response('Not Found', {
      status: 404
    })
  }
})

console.log(`Server is running at ${server.url}`)
