import { randomUUIDv7, type BunRequest } from 'bun'
import { postgres } from '../../database'
import { uploadTravelPhoto } from '../../s3'

export const uploadTravelPhotoHandler = async (req: BunRequest) => {
  try {
    const { travelId } = req.params

    const result = await postgres`SELECT * FROM travels WHERE id = ${travelId}`
    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ error: 'Travel not found' }), { status: 404 })
    }

    // TODO: fastify/busboy
    const formData = await req.formData()
    const photo = formData.get('photo') as File
    const description = (formData.get('description') as string) || null

    const photoUrl = await uploadTravelPhoto({ photo })

    const id = randomUUIDv7()
    await postgres`
      INSERT INTO travel_photos (id, url, travel_id, description)
      VALUES (${id}, ${photoUrl}, ${travelId}, ${description})
    `

    return new Response(null, {
      status: 200
    })
  } catch (error) {
    console.error('Error uploading travel photo:', error)

    return new Response(JSON.stringify({ error: 'Failed to upload travel photo' }), {
      status: 500
    })
  }
}
