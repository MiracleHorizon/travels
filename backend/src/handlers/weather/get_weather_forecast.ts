import { withAuth } from '../../middlewares/with_auth'
import { fetchForecast } from '../../domains/weather/openweather'
import { OPENWEATHER_LANG } from '../../domains/weather/locales'
import { OPENWEATHER_API_KEY } from '../../domains/weather/consts'

export const getWeatherForecastHandler = withAuth(async req => {
  if (!OPENWEATHER_API_KEY) {
    return new Response(JSON.stringify({ error: 'Weather service unavailable' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    const url = new URL(req.url)
    const lat = url.searchParams.get('lat')
    const lon = url.searchParams.get('lon')
    const locale = (url.searchParams.get('locale') || 'ru') as keyof typeof OPENWEATHER_LANG
    const lang = OPENWEATHER_LANG[locale] ?? OPENWEATHER_LANG.ru

    if (!lat || !lon) {
      return new Response(JSON.stringify({ error: 'lat and lon are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const latNum = Number.parseFloat(lat)
    const lonNum = Number.parseFloat(lon)

    if (Number.isNaN(latNum) || Number.isNaN(lonNum)) {
      return new Response(JSON.stringify({ error: 'Invalid lat or lon' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const data = await fetchForecast(latNum, lonNum, lang)

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Forecast fetch error:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch forecast' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
})
