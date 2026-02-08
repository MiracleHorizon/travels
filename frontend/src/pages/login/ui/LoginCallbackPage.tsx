import { useLogin } from '@/features/auth/login'
import { LogoYandex } from '@/shared/ui'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

export const LoginCallbackPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const { mutate: login, error } = useLogin()

  useEffect(() => {
    const code = searchParams.get('code')

    if (!code) {
      navigate('/login', { replace: true })
      toast.error('Не удалось авторизоваться', {
        description: 'Пожалуйста, попробуйте еще раз'
      })
      return
    }

    if (code) login(code)
  }, [searchParams, login, navigate])

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center text-red-600'>{error.message}</div>
      </div>
    )
  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      {/* TODO: Входим через разных провайдеров */}
      <div className='min-h-screen flex items-center justify-center'>
        <span className='text-muted-foreground'>Входим через</span>
        <div className='ml-1 flex items-center gap-0.5'>
          <LogoYandex className='size-5' />
          <span className='leading-5 text-md font-medium mb-0.5'>ндекс</span>
        </div>
        <span className='text-muted-foreground'>…</span>
      </div>
    </div>
  )
}
