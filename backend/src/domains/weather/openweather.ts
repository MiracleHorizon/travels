import { OPENWEATHER_API_KEY, OPENWEATHER_BASE } from './consts'

const FORECAST_CNT = 40

interface WeatherParams {
  lat: number
  lng: number
  lang: string
  units: string
}

export const fetchCurrentWeather = async ({ lat, lng, lang, units }: WeatherParams) => {
  const url = new URL(`${OPENWEATHER_BASE}/weather`)
  url.searchParams.set('lat', String(lat))
  url.searchParams.set('lon', String(lng))
  url.searchParams.set('appid', OPENWEATHER_API_KEY!)
  url.searchParams.set('units', units)
  url.searchParams.set('lang', lang)

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error('Failed to fetch weather')
  }

  return response.json()
}

export const fetchForecast = async ({ lat, lng, lang, units }: WeatherParams) => {
  const url = new URL(`${OPENWEATHER_BASE}/forecast`)
  url.searchParams.set('lat', String(lat))
  url.searchParams.set('lon', String(lng))
  url.searchParams.set('appid', OPENWEATHER_API_KEY!)
  url.searchParams.set('units', units)
  url.searchParams.set('lang', lang)
  url.searchParams.set('cnt', String(FORECAST_CNT))

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error('Failed to fetch forecast')
  }

  return response.json()
}
