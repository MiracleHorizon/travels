import { Navigate, Outlet } from 'react-router-dom'

import { useUser } from '@/entities/user'
import { FullscreenLoader } from '@/shared/ui'

export const ProtectedRoute = () => {
  const { isPending, data: user, error } = useUser()

  if (isPending) {
    return <FullscreenLoader />
  }

  if (error || !user) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}
