import { API_BASE_URL } from '@/shared/api'
import { useMutation } from '@tanstack/react-query'

interface CreateTravelDto {
  name: string
  description?: string
  startDate: string
  endDate: string
  tags?: string[]
}

export const useCreateTravelMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateTravelDto) => {
      const response = await fetch(`${API_BASE_URL}/v1/travels`, {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Failed to create travel')
      }
    }
  })
}
