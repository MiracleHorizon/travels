import type { BunRequest } from 'bun'
import { uploadTravelPhoto } from '../../s3'

export const uploadTravelPhotoHandler = async (req: BunRequest) => {
  try {
    const { travelId } = req.params
    const formData = await req.formData()
    const photo = formData.get('photo') as File
    const photoName = formData.get('photoName') as string

    const photoUrl = await uploadTravelPhoto({
      photo,
      travelId,
      photoName
    })

    return new Response(JSON.stringify({ photoUrl }), {
      status: 200
    })
  } catch (error) {
    console.error('Error uploading travel photo:', error)
    return new Response(JSON.stringify({ error: 'Failed to upload travel photo' }), {
      status: 500
    })
  }
}
