import { randomUUIDv7, type BunRequest } from 'bun'
import { postgres } from '../../database'
import { uploadTravelPhoto } from '../../s3'

export const uploadTravelPhotoHandler = async (req: BunRequest) => {
  try {
    const { travelId } = req.params

    // Проверяем наличие путешествия в базе.
    const result = await postgres`SELECT * FROM travels WHERE id = ${travelId}`
    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ error: 'Travel not found' }), { status: 404 })
    }

    // TODO: fastify/busboy
    const formData = await req.formData()
    const photo = formData.get('photo') as File | null
    const description = formData.get('description')

    if (!photo) {
      return new Response(JSON.stringify({ error: 'Photo is required' }), { status: 400 })
    }

    const photoId = randomUUIDv7()
    // Загружаем фотографию в S3 и получаем URL для доступа к ней.
    const photoUrl = await uploadTravelPhoto({ photo })

    // Сохраняем фотографию в базу данных, присваивая ее путешествию.
    await postgres`
      INSERT INTO travel_photos (id, url, travel_id, description)
      VALUES (${photoId}, ${photoUrl}, ${travelId}, ${description})
    `

    return new Response(null, {
      status: 200
    })
  } catch (error) {
    console.error('Error while uploading travel photo:', error)

    return new Response(JSON.stringify({ error: 'Failed while uploading travel photo' }), {
      status: 500
    })
  }
}
