import { useTranslation } from 'react-i18next'
import { TRAVELS_QUERY_KEY } from '@/entities/travel'
import {
  UploadTravelPhotosDto,
  useUploadTravelPhotosMutation
} from '../api/useUploadTravelPhotosMutation'
import { useQueryClient } from '@tanstack/react-query'
import { useHideModal } from '@/shared/lib/modal'
import { toast } from 'sonner'
import { useState } from 'react'

interface TravelPhotoUploadFormFields {
  photo: File | null
  description: string
}

export const useUploadTravelPhotos = () => {
  const { t } = useTranslation()
  const [formFields, setFormFields] = useState<TravelPhotoUploadFormFields>({
    photo: null,
    description: ''
  })

  const queryClient = useQueryClient()
  const hideModal = useHideModal()

  const { isPending, mutate } = useUploadTravelPhotosMutation()

  const uploadTravelPhotos = ({ travelId, ...data }: UploadTravelPhotosDto) =>
    mutate(
      {
        travelId,
        ...data
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [TRAVELS_QUERY_KEY, travelId]
          })
          hideModal()
          toast.success(t('toast.photo.uploaded'))
        },
        onError: () => {
          toast.error(t('toast.photo.uploadError'), {
            description: t('toast.tryAgain')
          })
        }
      }
    )

  return {
    isPending,
    uploadTravelPhotos,
    formFields,
    setFormFields
  }
}
