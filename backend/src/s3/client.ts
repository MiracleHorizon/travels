import { S3Client } from '@aws-sdk/client-s3'
import {
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY,
  YANDEX_CLOUD_STORAGE_REGION,
  YANDEX_CLOUD_STORAGE_URL
} from './consts'

export const s3Client = new S3Client({
  region: YANDEX_CLOUD_STORAGE_REGION,
  endpoint: YANDEX_CLOUD_STORAGE_URL,
  credentials: {
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY
  }
})
