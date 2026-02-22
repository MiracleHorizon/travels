import { useQuery } from '@tanstack/react-query'

import { API_BASE_URL } from '@/shared/api'
import type { GeoCoords } from '@/shared/lib/geo'

import { DEFAULT_WEATHER_LOCALE, type WeatherLocale, type WeatherUnits } from '../config/locales'
import { isValidCoords } from '../lib/isValidCoords'
import type { CurrentWeatherResponse } from '../model/types'

const WEATHER_QUERY_KEY = 'weather'

interface UseWeatherQueryProps {
  coords: GeoCoords
  locale?: WeatherLocale
  units?: WeatherUnits
}

export const useWeatherQuery = ({
  coords: { lat, lng },
  locale = DEFAULT_WEATHER_LOCALE,
  units = 'metric'
}: UseWeatherQueryProps) => {
  return useQuery<CurrentWeatherResponse>({
    queryKey: [WEATHER_QUERY_KEY, lat, lng, locale, units],
    enabled: isValidCoords({ lat, lng }),
    queryFn: async () => {
      const url = new URL(`${API_BASE_URL}/weather`, window.location.origin)

      url.searchParams.set('lat', String(lat))
      url.searchParams.set('lng', String(lng))
      url.searchParams.set('locale', locale)
      url.searchParams.set('units', units)

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
