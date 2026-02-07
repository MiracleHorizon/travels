import { useQuery } from '@tanstack/react-query'
import { API_BASE_URL } from '@/shared/api'
import type { TravelDetailed } from '../model/types'

export const TRAVELS_QUERY_KEY = 'travels'

export const useTravelsQuery = () => {
  return useQuery({
    queryKey: [TRAVELS_QUERY_KEY],
    queryFn: async () => {
      const params = new URLSearchParams()

      // if (filter?.status) {
      //   params.append('status', filter.status)
      // }

      // if (filter?.archived !== undefined) {
      //   params.append('archived', String(filter.archived))
      // }

      const url = `${API_BASE_URL}/v1/travels${params.toString() ? `?${params.toString()}` : ''}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Failed to fetch travels')
      }

      return response.json()
    }
  })
}

export const useTravelQuery = (travelId: string) => {
  return useQuery<TravelDetailed>({
    queryKey: [TRAVELS_QUERY_KEY, travelId],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/v1/travels/${travelId}`)

      if (!response.ok) {
        throw new Error('Failed to fetch travel')
      }

      return response.json()
    }
  })
}
