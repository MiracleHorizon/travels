import { useSuspenseQuery } from '@tanstack/react-query'
import type { WeatherForecastResponse } from '@/entities/weather'
import type { GeoCoords } from '@/shared/lib/geo'
import { API_BASE_URL } from '@/shared/api'
import { DEFAULT_WEATHER_LOCALE } from '@/entities/weather'
import type { WeatherLocale } from '@/entities/weather'
import { isValidCoords } from '@/entities/weather'

const FORECAST_QUERY_KEY = 'forecast'

interface UseForecastQueryProps {
  coords: GeoCoords
  locale?: WeatherLocale
}

export const useForecastSuspenseQuery = ({
  coords: { lat, lng },
  locale = DEFAULT_WEATHER_LOCALE
}: UseForecastQueryProps) => {
  return useSuspenseQuery<WeatherForecastResponse>({
    queryKey: [FORECAST_QUERY_KEY, lat, lng, locale],
    queryFn: async () => {
      if (!isValidCoords({ lat, lng })) {
        throw new Error('Invalid coordinates')
      }

      const url = new URL(`${API_BASE_URL}/weather/forecast`, window.location.origin)

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
