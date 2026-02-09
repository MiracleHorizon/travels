import { API_BASE_URL } from '@/shared/api'
import { useMutation } from '@tanstack/react-query'

interface UpdateTravelDto {
  travelId: string
  name: string
  description?: string
  startDate: string
  endDate: string
  tags?: string[]
}

export const useUpdateTravelMutation = () => {
  return useMutation({
    mutationFn: async ({ travelId, ...data }: UpdateTravelDto) => {
      const response = await fetch(`${API_BASE_URL}/v1/travels/${travelId}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Failed to update travel')
      }
    }
  })
}
