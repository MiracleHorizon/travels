import { useQuery } from '@tanstack/react-query'
import { API_BASE_URL } from '@/shared/api'
import type { TravelDetailed } from '../model/types'

export const TRAVELS_QUERY_KEY = 'travels'

interface UseTravelsQueryParams {
  status?: 'upcoming' | 'past'
  archived?: boolean
}

export const useTravelsQuery = ({ status, archived }: UseTravelsQueryParams = {}) => {
  return useQuery({
    queryKey: [TRAVELS_QUERY_KEY, status, archived],
    queryFn: async () => {
      const url = new URL(`${API_BASE_URL}/v1/travels`)

      if (status !== undefined) {
        url.searchParams.append('status', status)
      }

      if (archived !== undefined) {
        url.searchParams.append('archived', String(archived))
      }

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
