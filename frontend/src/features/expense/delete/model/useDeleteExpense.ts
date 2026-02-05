import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { EXPENSES_QUERY_KEY } from '@/entities/expense'
import { useHideModal } from '@/shared/lib/modal'

import { useDeleteExpenseMutation } from '../api/useDeleteExpenseMutation'

export const useDeleteExpense = (travelId: string, expenseId: string) => {
  const queryClient = useQueryClient()
  const hideModal = useHideModal()

  const { isPending, mutate } = useDeleteExpenseMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [EXPENSES_QUERY_KEY, travelId]
      })
      hideModal()
      toast.success('Расход удален')
    },
    onError: () => {
      toast.error('Не удалось удалить расход', {
        description: 'Пожалуйста, попробуйте еще раз'
      })
    }
  })

  const deleteExpense = () => mutate(expenseId)

  return {
    isLoading: isPending,
    deleteExpense
  }
}
