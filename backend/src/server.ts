import {
  createTravelHandler,
  deleteTravelHandler,
  getTravelHandler,
  getTravelsListHandler,
  updateTravelHandler
} from './handlers/travel'
import { corsHeaders, injectCORS } from './cors'

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
