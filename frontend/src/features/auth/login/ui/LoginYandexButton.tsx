import { Button, LogoYandex } from '@/shared/ui'
import { buildOAuthLoginUrl } from '../model/buildOAuthLoginUrl'
import { OAUTH_PROVIDER } from '../model/consts'

export const LoginYandexButton = () => {
  const handleYandexAuth = () => {
    const yandexLoginUrl = buildOAuthLoginUrl(OAUTH_PROVIDER.YANDEX)
    window.open(yandexLoginUrl, '_self')
  }

  return (
    <Button variant='secondary' size='lg' className='gap-2 w-full' onClick={handleYandexAuth}>
      <LogoYandex />
      Войти с Яндекс ID
    </Button>
  )
}
