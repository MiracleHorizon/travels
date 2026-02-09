import { API_BASE_URL } from '@/shared/api'
import { useMutation } from '@tanstack/react-query'

export const useDeleteTravelMutation = () => {
  return useMutation({
    mutationFn: async (travelId: string) => {
      const response = await fetch(`${API_BASE_URL}/v1/travels/${travelId}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Failed to delete travel')
      }
    }
  })
}
