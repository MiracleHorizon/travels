import { useQuery } from '@tanstack/react-query'
import type { OpenWeatherForecastResponse } from '../model/types'
import type { GeoCoords } from '@/shared/lib/geo'
import { API_BASE_URL } from '@/shared/api'
import { DEFAULT_WEATHER_LOCALE } from '../config'
import type { WeatherLocale } from '../config/locales'

const FORECAST_QUERY_KEY = 'forecast'

export const useForecastQuery = (
  { lat, lng }: GeoCoords,
  locale: WeatherLocale = DEFAULT_WEATHER_LOCALE
) => {
  return useQuery<OpenWeatherForecastResponse>({
    queryKey: [FORECAST_QUERY_KEY, lat, lng, locale],
    queryFn: async () => {
      const url = new URL(`${API_BASE_URL}/v1/weather/forecast`)
      url.searchParams.set('lat', String(lat))
      url.searchParams.set('lon', String(lng))
      url.searchParams.set('locale', locale)

      const response = await fetch(url.toString(), {
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Failed to fetch forecast')
      }

      return response.json()
    }
  })
}
