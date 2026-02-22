import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { User } from '../model/types'
import { getUser } from './getUser'
import { RETRY_COUNT, RETRY_DELAY, USER_QUERY_KEY } from './consts'

interface UseUserQueryParams {
  shouldRetry?: boolean
}

export const useUserQuery = ({ shouldRetry = true }: UseUserQueryParams = {}): UseQueryResult<
  User,
  Error
> => {
  return useQuery<User>({
    queryKey: [USER_QUERY_KEY],
    queryFn: getUser,
    ...(shouldRetry && {
      retry: RETRY_COUNT,
      retryDelay: RETRY_DELAY
    })
  })
}
