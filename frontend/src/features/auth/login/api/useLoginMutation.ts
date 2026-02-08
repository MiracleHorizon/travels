import { User } from '@/entities/user'
import { API_BASE_URL } from '@/shared/api'
import { useMutation, UseMutationResult } from '@tanstack/react-query'

interface UseLoginMutationParams {
  onSuccess?: (user: User) => void
  onError?: (error: Error) => void
}

interface UseLoginMutationPayload {
  code: string
  provider: string
}

const LOGIN_MUTATION_KEY = 'auth-with-code'

export const useLoginMutation = ({
  onSuccess,
  onError
}: UseLoginMutationParams): UseMutationResult<User, Error, UseLoginMutationPayload> => {
  return useMutation({
    mutationKey: [LOGIN_MUTATION_KEY],
    mutationFn: async ({ code, provider }: UseLoginMutationPayload): Promise<User> => {
      const redirectUri = `${window.location.origin}/login/callback/${provider}`
      const response = await fetch(`${API_BASE_URL}/auth/code/${provider}`, {
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
