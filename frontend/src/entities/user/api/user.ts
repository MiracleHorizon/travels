import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { API_BASE_URL } from '../../../shared/api/consts'
import { User } from '../model/types'

export const USER_QUERY_KEY = 'get-user'

const RETRY_COUNT = 3
const RETRY_DELAY = 1000

interface UseUserParams {
  shouldRetry?: boolean
}

export const useUser = ({ shouldRetry = true }: UseUserParams = {}): UseQueryResult<
  User,
  Error
> => {
  return useQuery<User>({
    queryKey: [USER_QUERY_KEY],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/user/me`, {
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error(response.status === 401 ? 'Unauthorized' : 'Failed to fetch user')
      }

      return response.json()
    },
    ...(shouldRetry && {
      retry: RETRY_COUNT,
      retryDelay: RETRY_DELAY
    })
  })
}
