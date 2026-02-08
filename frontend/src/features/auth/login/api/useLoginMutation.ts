import { User } from '@/entities/user'
import { API_BASE_URL } from '@/shared/api'
import { useMutation, UseMutationResult } from '@tanstack/react-query'

interface UseLoginMutationParams {
  onSuccess?: (user: User) => void
  onError?: (error: Error) => void
}

const LOGIN_MUTATION_KEY = 'auth-with-code'

export const useLoginMutation = ({
  onSuccess,
  onError
}: UseLoginMutationParams): UseMutationResult<User, Error, string> => {
  return useMutation({
    mutationKey: [LOGIN_MUTATION_KEY],
    mutationFn: async (code: string): Promise<User> => {
      const redirectUri = window.location.origin + '/login/callback'
      const response = await fetch(`${API_BASE_URL}/auth/code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code,
          redirect_uri: redirectUri
        }),
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Failed to authenticate with code')
      }

      const data = (await response.json()) as {
        user: User
      }

      return data.user
    },
    onSuccess,
    onError
  })
}
