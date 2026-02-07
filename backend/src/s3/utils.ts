import { S3_BUCKET_NAME, S3_STORAGE_URL } from './consts'

export const getTravelPhotoPath = (photoName: string): string => {
  return `travels/gallery/${photoName}`
}

export const getPhotoUrl = (photoPath: string): string => {
  return `${S3_STORAGE_URL}/${S3_BUCKET_NAME}/${photoPath}`
}
