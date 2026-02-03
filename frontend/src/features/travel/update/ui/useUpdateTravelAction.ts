import { useShowModal } from '@/shared/lib/modal'
import { updateTravelModalDefinition } from './UpdateTravelDialog'
import { Travel } from '@/entities/travel'

export const useUpdateTravelAction = () => {
  const showModal = useShowModal()

  return (travel: Travel) => {
    showModal(updateTravelModalDefinition, {
      travel
    })
  }
}
