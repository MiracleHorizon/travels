import { PutObjectCommand } from '@aws-sdk/client-s3'
import { S3_BUCKET_NAME, YANDEX_CLOUD_STORAGE_URL } from '../consts'
import { s3Client } from '../client'
import { randomUUIDv7 } from 'bun'

interface UploadTravelPhotoCommandInput {
  photo: File
}

export const uploadTravelPhoto = async ({ photo }: UploadTravelPhotoCommandInput) => {
  const arrayBuffer = await photo.arrayBuffer()
  const body = Buffer.from(arrayBuffer)

  const photoNameHash = randomUUIDv7()
  const key = `travels/gallery/${photoNameHash}`
  const command = new PutObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: key,
    Body: body,
    ContentLength: body.length
  })

  await s3Client.send(command)

  return `${YANDEX_CLOUD_STORAGE_URL}/${S3_BUCKET_NAME}/travels/gallery/${photoNameHash}`
}
