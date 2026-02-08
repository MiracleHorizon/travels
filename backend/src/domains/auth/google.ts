const GOOGLE_OAUTH_CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID as string
const GOOGLE_OAUTH_CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET as string
const GOOGLE_OAUTH_REDIRECT_URI =
  process.env.GOOGLE_OAUTH_REDIRECT_URI || 'http://localhost:3000/login/callback/google'

export const GOOGLE_OAUTH_CONFIG = {
  clientId: GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: GOOGLE_OAUTH_CLIENT_SECRET,
  redirectUri: GOOGLE_OAUTH_REDIRECT_URI
} as const

export interface GoogleTokensResponse {
  access_token: string
  refresh_token?: string
  expires_in: number
  token_type: string
  scope: string
  id_token: string
}

export interface GoogleProfile {
  /** Google user's unique ID */
  id: string
  /** User's email address */
  email: string
  /** Whether the email is verified */
  verified_email: boolean
  /** User's full name */
  name?: string
  /** User's given (first) name */
  given_name?: string
  /** User's family (last) name */
  family_name?: string
  /** URL of user's profile picture */
  picture?: string
  /** User's preferred locale */
  locale?: string
}
