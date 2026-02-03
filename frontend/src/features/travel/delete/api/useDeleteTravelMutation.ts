import { API_BASE_URL } from '@/shared/api'
import { useMutation } from '@tanstack/react-query'

export const useDeleteTravelMutation = ({
  onSuccess,
  onError
}: {
  onSuccess?: () => void
  onError?: () => void
} = {}) => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${API_BASE_URL}/v1/travels/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete travel')
      }

      return response.json()
    },
    onSuccess,
    onError
  })
}
