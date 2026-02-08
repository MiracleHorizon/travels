import { Navigate, Outlet } from 'react-router-dom'

import { useUser } from '@/entities/user'
import { FullscreanLoader } from '@/shared/ui'

export const ProtectedRoute = () => {
  const { isPending, data: user, error } = useUser()

  if (isPending) {
    return <FullscreanLoader />
  }

  if (error || !user) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}
