import { useUser } from '@/entities/user'
import { LoginYandexButton } from '@/features/auth/login'
import { Navigate } from 'react-router-dom'

export const LoginPage = () => {
  const { data: user, isPending } = useUser()

  if (isPending) {
    return <div>Загрузка…</div>
  }

  if (user) {
    return <Navigate to='/travels/planned' replace />
  }

  return (
    <div className='min-h-screen w-full flex items-center justify-center'>
      <div className='container flex flex-col items-center gap-6'>
        <LoginYandexButton />
      </div>
    </div>
  )
}
