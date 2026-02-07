import { API_BASE_URL } from '@/shared/api'
import { useMutation } from '@tanstack/react-query'

interface UploadTravelPhotosDto {
  photo: File
  photoName: string
}

interface UseUploadTravelPhotosMutationParams {
  travelId: string
  onSuccess?: () => void
  onError?: () => void
}

// TODO: Грузить несколько фотографий
export const useUploadTravelPhotosMutation = ({
  travelId,
  onSuccess,
  onError
}: UseUploadTravelPhotosMutationParams) => {
  return useMutation({
    mutationFn: async ({ photo, photoName }: UploadTravelPhotosDto) => {
      const formData = new FormData()

      formData.append('photo', photo)
      formData.append('photoName', photoName)

      await fetch(`${API_BASE_URL}/v1/photos/travels/${travelId}`, {
        method: 'POST',
        body: formData
      })
    },
    onSuccess,
    onError
  })
}
