import { OAUTH_PROVIDER } from './consts'

const YANDEX_OAUTH_CLIENT_ID = import.meta.env.VITE_YANDEX_OAUTH_CLIENT_ID
const GOOGLE_OAUTH_CLIENT_ID = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID

export const buildOAuthLoginUrl = (provider: OAUTH_PROVIDER): string => {
  const redirectUri = `${window.location.origin}/login/callback/${provider}`

  switch (provider) {
    case OAUTH_PROVIDER.YANDEX:
      if (!YANDEX_OAUTH_CLIENT_ID) {
        throw new Error('YANDEX_OAUTH_CLIENT_ID is not set')
      }

      return `https://oauth.yandex.ru/authorize?response_type=code&client_id=${YANDEX_OAUTH_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}`

    case OAUTH_PROVIDER.GOOGLE:
      if (!GOOGLE_OAUTH_CLIENT_ID) {
        throw new Error('GOOGLE_OAUTH_CLIENT_ID is not set')
      }

      const googleParams = new URLSearchParams({
        client_id: GOOGLE_OAUTH_CLIENT_ID,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: 'openid email profile',
        access_type: 'offline',
        prompt: 'consent'
      })

      return `https://accounts.google.com/o/oauth2/v2/auth?${googleParams.toString()}`

    default:
      throw new Error(`Unsupported provider: ${provider}`)
  }
}
