import { useShowModal } from '@/shared/lib/modal'
import { deleteTravelModalDefinition } from './DeleteTravelDialog'

export const useDeleteTravelAction = () => {
  const showModal = useShowModal()

  return (travelId: string, travelName: string) => {
    showModal(deleteTravelModalDefinition, {
      travelId,
      travelName
    })
  }
}
