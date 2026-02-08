import { Button, LogoGoogle } from '@/shared/ui'
import { buildOAuthLoginUrl } from '../model/buildOAuthLoginUrl'
import { OAUTH_PROVIDER } from '../model/consts'

export const LoginGoogleButton = () => {
  const handleGoogleAuth = () => {
    const googleLoginUrl = buildOAuthLoginUrl(OAUTH_PROVIDER.GOOGLE)
    window.open(googleLoginUrl, '_self')
  }

  return (
    <Button variant='secondary' size='lg' className='gap-2 w-full' onClick={handleGoogleAuth}>
      <LogoGoogle />
      Войти с Google
    </Button>
  )
}
