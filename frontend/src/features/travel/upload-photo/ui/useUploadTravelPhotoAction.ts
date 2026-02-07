import { useShowModal } from '@/shared/lib/modal'
import { uploadTravelPhotoModalDefinition } from './UploadTravelPhotoDialog'

export const useUploadTravelPhotoAction = () => {
  const showModal = useShowModal()

  const uploadTravelPhoto = (travelId: string) => {
    showModal(uploadTravelPhotoModalDefinition, { travelId })
  }

  return { uploadTravelPhoto }
}
