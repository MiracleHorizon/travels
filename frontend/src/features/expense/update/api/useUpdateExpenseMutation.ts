import { API_BASE_URL } from '@/shared/api'
import { useMutation } from '@tanstack/react-query'

interface UpdateExpenseDto {
  title: string
  amount: number
  description?: string
  date?: string
  category: string
}

interface UseUpdateExpenseMutationParams {
  expenseId: string | number
  onSuccess?: () => void
  onError?: () => void
}

export const useUpdateExpenseMutation = ({
  expenseId,
  onSuccess,
  onError
}: UseUpdateExpenseMutationParams) => {
  return useMutation({
    mutationFn: async (data: UpdateExpenseDto) => {
      await fetch(`${API_BASE_URL}/v1/expenses/${expenseId}`, {
        method: 'PATCH',
        body: JSON.stringify(data)
      })
    },
    onSuccess,
    onError
  })
}
