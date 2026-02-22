import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query'
import { User } from '../model/types'
import { RETRY_COUNT, RETRY_DELAY, USER_QUERY_KEY } from './consts'
import { getUser } from './getUser'

export const useSuspenseUserQuery = (): UseSuspenseQueryResult<User, Error> => {
  return useSuspenseQuery<User>({
    queryKey: [USER_QUERY_KEY],
    queryFn: getUser,
    retry: RETRY_COUNT,
    retryDelay: RETRY_DELAY
  })
}
