import path from 'path'
import {
  createTravelHandler,
  deleteTravelHandler,
  getTravelHandler,
  getTravelsListHandler,
  toggleTravelArchiveHandler,
  updateTravelHandler,
  uploadTravelPhotoHandler
} from './handlers/travel'
import {
  createExpenseHandler,
  getExpensesListHandler,
  deleteExpenseHandler,
  updateExpenseHandler
} from './handlers/expense'
import { getUserByCodeHandler, getUserMeHandler, logoutHandler } from './handlers/auth'
import { getGeoCoderCoordsHandler, getGeoCoderLocationHandler } from './handlers/geo'
import { getCurrentWeatherHandler, getWeatherForecastHandler } from './handlers/weather'
import { getUserSettingsHandler, updateUserSettingsHandler } from './handlers/user-settings'
import { getCountryInfoHandler } from './handlers/country'
import { corsHeaders, injectCORS } from './cors'

const certDir = path.resolve(import.meta.dir, '..', 'cert')

// TODO: Механизм мидлваров
const server = Bun.serve({
  port: 4200,
  tls: {
    key: Bun.file(path.join(certDir, 'localhost-key.pem')),
    cert: Bun.file(path.join(certDir, 'localhost.pem'))
  },
  routes: injectCORS(
    {
      // Авторизация
      '/api/auth/code/:provider': {
        POST: getUserByCodeHandler
      },
      '/api/auth/logout': {
        POST: logoutHandler
      },
      // Пользователь
      '/api/user/me': {
        GET: getUserMeHandler
      },
      '/api/v1/user/settings': {
        GET: getUserSettingsHandler,
        PATCH: updateUserSettingsHandler
      },
      // Погода
      '/api/weather': {
        GET: getCurrentWeatherHandler
      },
      '/api/weather/forecast': {
        GET: getWeatherForecastHandler
      },
      // Страны
      '/api/v1/country': {
        GET: getCountryInfoHandler
      },
      // Геокодер
      '/api/v1/geo/coords': {
        POST: getGeoCoderCoordsHandler
      },
      '/api/v1/geo/location': {
        POST: getGeoCoderLocationHandler
      },
      // Путешествие
      '/api/v1/travels': {
        POST: createTravelHandler,
        GET: getTravelsListHandler
      },
      '/api/v1/travels/:travelId': {
        GET: getTravelHandler,
        PATCH: updateTravelHandler,
        DELETE: deleteTravelHandler
      },
      '/api/v1/travels/:travelId/archive': {
        PATCH: toggleTravelArchiveHandler
      },
      '/api/v1/photos/travels/:travelId': {
        POST: uploadTravelPhotoHandler
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
