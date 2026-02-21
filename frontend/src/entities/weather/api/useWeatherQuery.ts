import { useQuery } from '@tanstack/react-query'
import type { OpenWeatherResponse } from '../model/types'
import type { GeoCoords } from '@/shared/lib/geo'
import { API_BASE_URL } from '@/shared/api'
import { DEFAULT_WEATHER_LOCALE } from '../config'
import type { WeatherLocale } from '../config/locales'
import { isValidCoords } from '../lib/isValidCoords'

const WEATHER_QUERY_KEY = 'weather'

export const useWeatherQuery = (
  { lat, lng }: GeoCoords,
  locale: WeatherLocale = DEFAULT_WEATHER_LOCALE
) => {
  return useQuery<OpenWeatherResponse>({
    queryKey: [WEATHER_QUERY_KEY, lat, lng, locale],
    enabled: isValidCoords({ lat, lng }),
    queryFn: async () => {
      const url = new URL(`${API_BASE_URL}/weather`, window.location.origin)

      url.searchParams.set('lat', String(lat))
      url.searchParams.set('lon', String(lng))
      url.searchParams.set('locale', locale)

      const response = await fetch(url.toString(), {
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Failed to fetch weather')
      }

      return response.json()
    }
  })
}
