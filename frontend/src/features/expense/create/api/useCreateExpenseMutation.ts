import { API_BASE_URL } from '@/shared/api'
import { useMutation } from '@tanstack/react-query'
import type { ExpenseCategory } from '@/entities/expense'

export interface CreateExpenseDto {
  title: string
  amount: number
  description: string | undefined
  date: string | undefined
  category: ExpenseCategory
  link: string | undefined
}

export const useCreateExpenseMutation = ({ travelId }: { travelId: string }) => {
  return useMutation({
    mutationFn: async (data: CreateExpenseDto) => {
      const response = await fetch(`${API_BASE_URL}/v1/expenses/${travelId}`, {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Failed to create expense')
      }
    }
  })
}
