import {
  createTravelHandler,
  deleteTravelHandler,
  getTravelHandler,
  getTravelsListHandler,
  updateTravelHandler
} from './handlers/travel'
import { corsHeaders } from './cors'

const handleOptions = () => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders
  })
}

const server = Bun.serve({
  port: 4200,
  routes: {
    // Путешествие
    '/api/v1/travels': {
      OPTIONS: handleOptions,
      POST: createTravelHandler,
      GET: getTravelsListHandler
    },
    '/api/v1/travels/:id': {
      OPTIONS: handleOptions,
      GET: getTravelHandler,
      PATCH: updateTravelHandler,
      DELETE: deleteTravelHandler
    }
  },
  fetch: () => {
    return new Response('Not Found', {
      status: 404
    })
  }
})

console.log(`Server is running at ${server.url}`)
