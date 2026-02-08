import { useShowModal } from '@/shared/lib/modal'
import { updateExpenseModalDefinition } from './UpdateExpenseDialog'
import { Expense } from '@/entities/expense'

export const useUpdateExpenseAction = () => {
  const showModal = useShowModal()

  return (expense: Expense) => {
    showModal(updateExpenseModalDefinition, {
      expense
    })
  }
}
