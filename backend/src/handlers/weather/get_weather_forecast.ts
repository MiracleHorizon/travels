import { withAuth } from '../../middlewares/with_auth'
import { fetchForecast } from '../../domains/weather/openweather'
import { OPENWEATHER_LANG } from '../../domains/weather/locales'
import { OPENWEATHER_API_KEY } from '../../domains/weather/consts'

export const getWeatherForecastHandler = withAuth(async req => {
  if (!OPENWEATHER_API_KEY) {
    return new Response(
      JSON.stringify({
        error: 'Weather service unavailable'
      }),
      {
        status: 503,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  try {
    const url = new URL(req.url)
    const latParam = url.searchParams.get('lat')
    const lngParam = url.searchParams.get('lng')
    const locale = (url.searchParams.get('locale') || 'ru') as keyof typeof OPENWEATHER_LANG
    const lang = OPENWEATHER_LANG[locale] ?? OPENWEATHER_LANG.ru
    const units = url.searchParams.get('units') ?? 'metric'

    if (!latParam || !lngParam) {
      return new Response(
        JSON.stringify({
          error: 'lat and lng are required'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }

    const lat = Number.parseFloat(latParam)
    const lng = Number.parseFloat(lngParam)

    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      return new Response(
        JSON.stringify({
          error: 'Invalid lat or lng'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }

    const data = await fetchForecast({
      lat,
      lng,
      lang,
      units
    })

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error('Forecast fetch error:', error)
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch forecast'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
})
