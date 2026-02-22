import { useTranslation } from 'react-i18next'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { EXPENSES_QUERY_KEY } from '@/entities/expense'
import { useHideModal } from '@/shared/lib/modal'

import { useDeleteExpenseMutation } from '../api/useDeleteExpenseMutation'

export const useDeleteExpense = (travelId: string, expenseId: string) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const hideModal = useHideModal()

  const { isPending, mutate } = useDeleteExpenseMutation()

  const deleteExpense = () => {
    mutate(expenseId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [EXPENSES_QUERY_KEY, travelId]
        })
        hideModal()
        toast.success(t('toast.expense.deleted'))
      },
      onError: () => {
        toast.error(t('toast.expense.deleteError'), {
          description: t('toast.tryAgain')
        })
      }
    })
  }

  return {
    isPending,
    deleteExpense
  }
}
