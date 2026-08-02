import { Navigate, Outlet } from 'react-router-dom'

import { useUserQuery } from '@/entities/user'
import { Loader } from '@/shared/ui'

export const ProtectedRoute = () => {
  const { data: user, isPending } = useUserQuery({ shouldRetry: false })

  if (isPending) {
    return <Loader variant='fullscreen' />
  }

  if (!user) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}
