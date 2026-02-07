import { PutObjectCommand } from '@aws-sdk/client-s3'
import { randomUUIDv7 } from 'bun'

import { s3Client } from '../client'
import { S3_BUCKET_NAME } from '../consts'
import { getTravelPhotoPath, getPhotoUrl } from '../utils'

interface UploadTravelPhotoCommandInput {
  photo: File
}

export const uploadTravelPhoto = async ({ photo }: UploadTravelPhotoCommandInput) => {
  // Преобразуем файл в буфер для загрузки в S3.
  const fileArrayBuffer = await photo.arrayBuffer()
  const fileBuffer = Buffer.from(fileArrayBuffer)

  // Генерируем случайное имя для фотографии и получаем итоговый путь загрузки в S3.
  const photoName = randomUUIDv7()
  const photoPath = getTravelPhotoPath(photoName)

  const command = new PutObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: photoPath,
    Body: fileBuffer,
    ContentLength: fileBuffer.length
  })

  await s3Client.send(command)

  return getPhotoUrl(photoPath)
}
