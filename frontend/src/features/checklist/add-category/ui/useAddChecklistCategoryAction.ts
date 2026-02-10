import { useShowModal } from '@/shared/lib/modal'
import { addChecklistCategoryDialogDefinition } from './AddChecklistCategoryDialog'

export const useAddChecklistCategoryAction = () => {
  const showModal = useShowModal()

  const addChecklistCategory = () => {
    showModal(addChecklistCategoryDialogDefinition)
  }

  return {
    addChecklistCategory
  }
}
