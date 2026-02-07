import { S3Client } from '@aws-sdk/client-s3'
import { S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_STORAGE_REGION, S3_STORAGE_URL } from './consts'

// TODO: Переписать на Bun, если не лень.
// https://bun.com/docs/runtime/s3
export const s3Client = new S3Client({
  region: S3_STORAGE_REGION,
  endpoint: S3_STORAGE_URL,
  credentials: {
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY
  }
})
