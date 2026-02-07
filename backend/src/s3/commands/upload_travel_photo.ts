import { PutObjectCommand } from '@aws-sdk/client-s3'
import { S3_BUCKET_NAME, YANDEX_CLOUD_STORAGE_URL } from '../consts'
import { s3Client } from '../client'

interface UploadTravelPhotoCommandInput {
  photo: File
  travelId: string
  photoName: string
}

export const uploadTravelPhoto = async ({
  photo,
  travelId,
  photoName
}: UploadTravelPhotoCommandInput) => {
  const arrayBuffer = await photo.arrayBuffer()
  const body = Buffer.from(arrayBuffer)

  const key = `travels/gallery/${travelId}/${photoName}`
  const command = new PutObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: key,
    Body: body,
    ContentLength: body.length
  })

  await s3Client.send(command)

  return `${YANDEX_CLOUD_STORAGE_URL}/${S3_BUCKET_NAME}/travels/gallery/${travelId}/${photoName}`
}
