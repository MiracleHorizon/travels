import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_BASE_URL } from '@/shared/api'
import { SETTINGS_QUERY_KEY } from './useSettingsQuery'
import type { UserSettings } from '../model/types'

export const useUpdateSettingsMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: Partial<UserSettings>) => {
      const response = await fetch(`${API_BASE_URL}/v1/user/settings`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error(response.status === 401 ? 'Unauthorized' : 'Failed to update settings')
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SETTINGS_QUERY_KEY]
      })
    }
  })
}
