import { API_BASE_URL } from '@/shared/api'
import { useMutation } from '@tanstack/react-query'

interface UpdateExpenseDto {
  title: string
  amount: number
  currency: string
  description?: string
  date?: string
  category: string
  link?: string
}

export const useUpdateExpenseMutation = ({ expenseId }: { expenseId: string | number }) => {
  return useMutation({
    mutationFn: async (data: UpdateExpenseDto) => {
      const response = await fetch(`${API_BASE_URL}/v1/expenses/${expenseId}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Failed to update expense')
      }
    }
  })
}
