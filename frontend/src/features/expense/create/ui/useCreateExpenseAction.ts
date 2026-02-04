import { useShowModal } from '@/shared/lib/modal'
import { createExpenseModalDefinition } from './CreateExpenseDialog'

export const useCreateExpenseAction = ({ travelId }: { travelId: string }) => {
  const showModal = useShowModal()

  const createExpense = () => {
    showModal(createExpenseModalDefinition, {
      travelId
    })
  }

  return { createExpense }
}
