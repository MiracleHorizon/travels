import { API_BASE_URL } from '@/shared/api'
import { useMutation } from '@tanstack/react-query'

export const useDeleteExpenseMutation = () => {
  return useMutation({
    mutationFn: async (expenseId: string) => {
      const response = await fetch(`${API_BASE_URL}/v1/expenses/${expenseId}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Failed to delete expense')
      }
    }
  })
}
