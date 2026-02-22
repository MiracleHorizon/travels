import { Navigate, Outlet } from 'react-router-dom'

import { useSuspenseUserQuery } from '@/entities/user'

export const ProtectedRoute = () => {
  const { data: user, error } = useSuspenseUserQuery()

  if (error || !user) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}
