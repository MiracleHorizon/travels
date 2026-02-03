import { SQL } from 'bun'

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in the environment variables')
}

export const postgres = new SQL(DATABASE_URL)
