import { useShowModal } from '@/shared/lib/modal'
import { updateTravelModalDefinition } from './UpdateTravelDialog'

export const useUpdateTravelAction = () => {
  const showModal = useShowModal()

  return (travelId: string) => {
    showModal(updateTravelModalDefinition, {
      travelId
    })
  }
}
