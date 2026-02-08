import { OAUTH_PROVIDER } from './consts'

const YANDEX_OAUTH_CLIENT_ID = import.meta.env.VITE_YANDEX_OAUTH_CLIENT_ID

export const buildOAuthLoginUrl = (provider: OAUTH_PROVIDER): string => {
  switch (provider) {
    case OAUTH_PROVIDER.YANDEX:
      if (!YANDEX_OAUTH_CLIENT_ID) {
        throw new Error('YANDEX_OAUTH_CLIENT_ID is not set')
      }

      return `https://oauth.yandex.ru/authorize?response_type=code&client_id=${YANDEX_OAUTH_CLIENT_ID}&redirect_uri=${encodeURIComponent(`${window.location.origin}/login/callback/${provider}`)}`
    default:
      throw new Error(`Unsupported provider: ${provider}`)
  }
}
