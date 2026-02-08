import { Navigate, Outlet } from 'react-router-dom'

import { useUser } from '@/entities/user'

export const ProtectedRoute = () => {
  const { isPending, data: user, error } = useUser()

  if (isPending) {
    return <div>Загрузка…</div>
  }

  if (error || !user) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}
