import { useShowModal } from '@/shared/lib/modal'
import { deleteExpenseModalDefinition } from './DeleteExpenseDialog'

export const useDeleteExpenseAction = () => {
  const showModal = useShowModal()

  return (travelId: string, expenseId: string | number, expenseTitle: string) => {
    showModal(deleteExpenseModalDefinition, {
      travelId,
      expenseId,
      expenseTitle
    })
  }
}
