import { User } from '@/entities/user'
import { API_BASE_URL } from '@/shared/api'
import { useMutation, UseMutationResult } from '@tanstack/react-query'

export interface LoginDto {
  code: string
  provider: string
}

const LOGIN_MUTATION_KEY = 'auth-with-code'

export const useLoginMutation = (): UseMutationResult<User, Error, LoginDto> => {
  return useMutation({
    mutationKey: [LOGIN_MUTATION_KEY],
    mutationFn: async ({ code, provider }: LoginDto): Promise<User> => {
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

      return response.json() as Promise<User>
    }
  })
}
