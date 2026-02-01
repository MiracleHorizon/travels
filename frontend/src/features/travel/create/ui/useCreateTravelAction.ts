import { useShowModal } from '@/shared/lib'
import { createTravelModalDefinition } from './CreateTravelDialog'

export const useCreateTravelAction = () => {
  const showModal = useShowModal()

  const createTravel = () => {
    showModal(createTravelModalDefinition)
  }

  return { createTravel }
}
