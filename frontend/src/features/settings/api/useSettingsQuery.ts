import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult
} from '@tanstack/react-query'
import { API_BASE_URL } from '@/shared/api'
import { UserSettings } from '../model/types'

export const SETTINGS_QUERY_KEY = 'user-settings'

export const useSettingsQuery = (
  options?: Omit<UseSuspenseQueryOptions<UserSettings, Error>, 'queryKey' | 'queryFn'>
): UseSuspenseQueryResult<UserSettings, Error> => {
  return useSuspenseQuery({
    queryKey: [SETTINGS_QUERY_KEY],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/v1/user/settings`, {
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error(response.status === 401 ? 'Unauthorized' : 'Failed to fetch settings')
      }

      return response.json()
    },
    ...options
  })
}
