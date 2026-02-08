import { randomUUIDv7 } from 'bun'
import { postgres } from '../../database'
import { uploadTravelPhoto } from '../../s3'
import { withAuth } from '../../middlewares/with_auth'

export const uploadTravelPhotoHandler = withAuth(async req => {
  const userId = req.userId

  try {
    const { travelId } = req.params

    // Проверяем наличие путешествия в базе и что оно принадлежит пользователю
    const result = await postgres`
      SELECT * FROM travels 
      WHERE id = ${travelId} AND user_id = ${userId}
    `

    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ error: 'Travel not found or access denied' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      })
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
})
