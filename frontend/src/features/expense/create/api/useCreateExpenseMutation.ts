import { API_BASE_URL } from '@/shared/api'
import { useMutation } from '@tanstack/react-query'
import type { ExpenseCategory } from '@/entities/expense'

export interface CreateExpenseDto {
  title: string
  amount: number
  description: string | undefined
  date: string | undefined
  category: ExpenseCategory
}

export const useCreateExpenseMutation = ({
  travelId,
  onSuccess,
  onError
}: {
  travelId: string
  onSuccess?: () => void
  onError?: () => void
}) => {
  return useMutation({
    mutationFn: async (data: CreateExpenseDto) => {
      const response = await fetch(`${API_BASE_URL}/v1/travels/${travelId}/expenses`, {
        method: 'POST',
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Failed to create expense')
      }

      return response.json()
    },
    onSuccess,
    onError
  })
}
