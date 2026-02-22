import { useTranslation } from 'react-i18next'
import { useLogin, OAUTH_PROVIDER } from '@/features/auth/login'
import { LogoYandex, LogoGoogle } from '@/shared/ui'
import { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

export const LoginCallbackPage = () => {
  const { t } = useTranslation()

  const { provider } = useParams<{ provider: OAUTH_PROVIDER }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const { mutate: login, error } = useLogin()

  useEffect(() => {
    const code = searchParams.get('code')

    if (!code || !provider) {
      navigate('/login', { replace: true })
      toast.error(t('login.authError'), {
        description: t('toast.tryAgain')
      })
      return
    }

    login({
      code,
      provider
    })
  }, [searchParams, provider, login, navigate, t])

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center text-red-600'>{error.message}</div>
      </div>
    )
  }

  const renderProviderLogo = () => {
    if (provider === OAUTH_PROVIDER.YANDEX) {
      return (
        <div className='ml-1 flex items-center gap-0.5'>
          {/* TODO: Переделать на компонент с локализацией */}
          <LogoYandex className='size-5' />
          <span className='leading-5 text-md font-medium mb-0.5'>ндекс</span>
        </div>
      )
    }

    if (provider === OAUTH_PROVIDER.GOOGLE) {
      return (
        <div className='ml-1 flex items-center gap-2'>
          <LogoGoogle className='size-5' />
          <span className='leading-5 text-md font-medium'>Google</span>
        </div>
      )
    }

    return null
  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='flex items-center'>
        <span className='text-muted-foreground'>{t('login.loggingIn')}</span>
        {renderProviderLogo()}
        <span className='text-muted-foreground'>…</span>
      </div>
    </div>
  )
}
