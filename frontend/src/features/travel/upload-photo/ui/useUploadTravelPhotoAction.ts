import { useShowModal } from '@/shared/lib/modal'
import { uploadTravelPhotoModalDefinition } from './UploadTravelPhotoDialog'

export const useUploadTravelPhotoAction = () => {
  const showModal = useShowModal()

  return (travelId: string) => {
    showModal(uploadTravelPhotoModalDefinition, {
      travelId
    })
  }
}
