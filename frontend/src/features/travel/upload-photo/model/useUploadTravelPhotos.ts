import { TRAVELS_QUERY_KEY } from '@/entities/travel'
import { useUploadTravelPhotosMutation } from '../api/useUploadTravelPhotosMutation'
import { useQueryClient } from '@tanstack/react-query'
import { useHideModal } from '@/shared/lib/modal'
import { toast } from 'sonner'
import { useState } from 'react'

interface TravelPhotoUploadFormFields {
  photoName: string
  photo: File | null
  previewUrl: string | null
}

interface UseUploadTravelPhotosParams {
  travelId: string
}

export const useUploadTravelPhotos = ({ travelId }: UseUploadTravelPhotosParams) => {
  const [formFields, setFormFields] = useState<TravelPhotoUploadFormFields>({
    photoName: '',
    photo: null,
    previewUrl: null
  })

  const queryClient = useQueryClient()
  const hideModal = useHideModal()

  const { isPending, mutate: uploadTravelPhotos } = useUploadTravelPhotosMutation({
    travelId,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TRAVELS_QUERY_KEY, travelId]
      })
      hideModal()
      toast.success('Фотография загружена')
    },
    onError: () => {
      toast.error('Не удалось загрузить фотографию', {
        description: 'Пожалуйста, попробуйте еще раз'
      })
    }
  })

  return {
    isLoading: isPending,
    uploadTravelPhotos,
    formFields,
    setFormFields
  }
}
