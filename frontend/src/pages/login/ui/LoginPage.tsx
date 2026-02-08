import { useUser } from '@/entities/user'
import { LoginYandexButton, LoginGoogleButton } from '@/features/auth/login'
import { FullscreanLoader } from '@/shared/ui'
import { Navigate } from 'react-router-dom'

export const LoginPage = () => {
  const { data: user, isPending } = useUser({
    shouldRetry: false
  })

  if (isPending) {
    return <FullscreanLoader />
  }

  if (user) {
    return <Navigate to='/travels/planned' replace />
  }

  return (
    <div className='min-h-screen w-full flex items-center justify-center'>
      <div className='container flex flex-col items-center gap-2 w-[190px]'>
        <LoginYandexButton />
        <LoginGoogleButton />
      </div>
    </div>
  )
}
