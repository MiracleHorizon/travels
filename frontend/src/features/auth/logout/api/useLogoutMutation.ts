import { useMutation } from '@tanstack/react-query'
import { API_BASE_URL } from '@/shared/api'

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Failed to logout')
      }
    }
  })
}
