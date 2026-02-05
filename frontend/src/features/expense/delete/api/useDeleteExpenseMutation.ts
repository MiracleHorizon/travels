import { API_BASE_URL } from '@/shared/api'
import { useMutation } from '@tanstack/react-query'

export const useDeleteExpenseMutation = ({
  onSuccess,
  onError
}: {
  onSuccess?: () => void
  onError?: (error: unknown) => void
} = {}) => {
  return useMutation({
    mutationFn: async (expenseId: string) => {
      await fetch(`${API_BASE_URL}/v1/expenses/${expenseId}`, {
        method: 'DELETE'
      })
    },
    onSuccess,
    onError
  })
}
