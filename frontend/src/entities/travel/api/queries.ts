import { useQuery } from '@tanstack/react-query'
import { API_BASE_URL } from '@/shared/api'
import type { Travel } from '../model/types'

interface TravelsFilter {
  status?: 'upcoming' | 'past'
  archived?: boolean
}

export const TRAVELS_QUERY_KEY = 'travels'

export const useTravelsQuery = (filter?: TravelsFilter) => {
  return useQuery({
    queryKey: [TRAVELS_QUERY_KEY, filter],
    queryFn: async () => {
      const params = new URLSearchParams()

      if (filter?.status) {
        params.append('status', filter.status)
      }

      if (filter?.archived !== undefined) {
        params.append('archived', String(filter.archived))
      }

      const url = `${API_BASE_URL}/travels${params.toString() ? `?${params.toString()}` : ''}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Failed to fetch travels')
      }

      return response.json()
    }
  })
}

export const useTravelQuery = (id: string) => {
  return useQuery<Travel>({
    queryKey: [TRAVELS_QUERY_KEY, id],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/travels/${id}`)

      if (!response.ok) {
        throw new Error('Failed to fetch travel')
      }

      return response.json()
    }
  })
}
