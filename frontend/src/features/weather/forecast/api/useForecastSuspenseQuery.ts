import { useSuspenseQuery } from '@tanstack/react-query'

import {
  DEFAULT_WEATHER_LOCALE,
  isValidCoords,
  type WeatherLocale,
  type WeatherForecastResponse,
  type WeatherUnits
} from '@/entities/weather'
import { API_BASE_URL } from '@/shared/api'
import type { GeoCoords } from '@/shared/lib/geo'

const FORECAST_QUERY_KEY = 'forecast'

interface UseForecastQueryProps {
  coords: GeoCoords
  locale?: WeatherLocale
  units?: WeatherUnits
}

export const useForecastSuspenseQuery = ({
  coords: { lat, lng },
  locale = DEFAULT_WEATHER_LOCALE,
  units = 'metric'
}: UseForecastQueryProps) => {
  return useSuspenseQuery<WeatherForecastResponse>({
    queryKey: [FORECAST_QUERY_KEY, lat, lng, locale, units],
    queryFn: async () => {
      if (!isValidCoords({ lat, lng })) {
        throw new Error('Invalid coordinates')
      }

      const url = new URL(`${API_BASE_URL}/weather/forecast`, window.location.origin)

      url.searchParams.set('lat', String(lat))
      url.searchParams.set('lng', String(lng))
      url.searchParams.set('locale', locale)
      url.searchParams.set('units', units)

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
