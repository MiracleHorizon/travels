import { useQuery } from '@tanstack/react-query'
import { API_BASE_URL } from '@/shared/api'
import type { Expense } from '../model/types'

export const EXPENSES_QUERY_KEY = 'expenses-list'

export const useExpensesQuery = ({ travelId }: { travelId: string }) => {
  return useQuery<Expense[]>({
    queryKey: [EXPENSES_QUERY_KEY, travelId],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/v1/travels/${travelId}/expenses`)

      if (!response.ok) {
        throw new Error('Failed to fetch expenses')
      }

      return response.json()
    }
  })
}
