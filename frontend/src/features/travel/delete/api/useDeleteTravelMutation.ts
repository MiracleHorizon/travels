import { API_BASE_URL } from '@/shared/api'
import { useMutation } from '@tanstack/react-query'

export const useDeleteTravelMutation = ({
  onSuccess,
  onError
}: {
  onSuccess?: () => void
  onError?: (error: unknown) => void
} = {}) => {
  return useMutation({
    mutationFn: async (travelId: string) => {
      await fetch(`${API_BASE_URL}/v1/travels/${travelId}`, {
        method: 'DELETE'
      })
    },
    onSuccess,
    onError
  })
}
