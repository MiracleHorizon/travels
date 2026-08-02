import { useQuery } from '@tanstack/react-query'
import { API_BASE_URL } from '@/shared/api'
import type { CountryInfo } from '../model/types'

export const COUNTRY_QUERY_KEY = 'country'

export const useCountryQuery = (countryName: string | null | undefined) => {
  return useQuery<CountryInfo>({
    queryKey: [COUNTRY_QUERY_KEY, countryName],
    enabled: !!countryName,
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/v1/country?name=${encodeURIComponent(countryName!)}`,
        { credentials: 'include' }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch country info')
      }

      return response.json()
    }
  })
}
