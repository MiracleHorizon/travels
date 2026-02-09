import { API_BASE_URL } from '@/shared/api'
import { useMutation } from '@tanstack/react-query'

export interface UploadTravelPhotosDto {
  travelId: string
  photo: File
  description: string
}

// TODO: Грузить несколько фотографий
export const useUploadTravelPhotosMutation = () => {
  return useMutation({
    mutationFn: async ({ travelId, photo, description }: UploadTravelPhotosDto) => {
      const formData = new FormData()

      formData.append('photo', photo)
      formData.append('description', description)

      const response = await fetch(`${API_BASE_URL}/v1/photos/travels/${travelId}`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Failed to upload photo')
      }
    }
  })
}
