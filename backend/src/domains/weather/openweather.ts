import { OPENWEATHER_API_KEY, OPENWEATHER_BASE } from './consts'

const FORECAST_CNT = 40

export const fetchCurrentWeather = async (
  lat: number,
  lon: number,
  lang: string
) => {
  const url = new URL(`${OPENWEATHER_BASE}/weather`)
  url.searchParams.set('lat', String(lat))
  url.searchParams.set('lon', String(lon))
  url.searchParams.set('appid', OPENWEATHER_API_KEY!)
  url.searchParams.set('units', 'metric')
  url.searchParams.set('lang', lang)

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error('Failed to fetch weather')
  }

  return response.json()
}

export const fetchForecast = async (lat: number, lon: number, lang: string) => {
  const url = new URL(`${OPENWEATHER_BASE}/forecast`)
  url.searchParams.set('lat', String(lat))
  url.searchParams.set('lon', String(lon))
  url.searchParams.set('appid', OPENWEATHER_API_KEY!)
  url.searchParams.set('units', 'metric')
  url.searchParams.set('lang', lang)
  url.searchParams.set('cnt', String(FORECAST_CNT))

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error('Failed to fetch forecast')
  }

  return response.json()
}
