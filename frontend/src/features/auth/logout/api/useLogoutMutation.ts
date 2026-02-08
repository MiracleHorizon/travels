import { useMutation } from '@tanstack/react-query'
import { API_BASE_URL } from '@/shared/api'

interface UseLogoutMutationParams {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export const useLogoutMutation = ({ onSuccess, onError }: UseLogoutMutationParams) => {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Failed to logout')
      }

      return response.json()
    },
    onSuccess,
    onError
  })
}
