import { API_BASE_URL } from '@/shared/api'
import { useMutation } from '@tanstack/react-query'

interface UpdateTravelDto {
  name: string
  description?: string
  startDate: string
  endDate: string
  tags?: string[]
}

interface UseUpdateTravelMutationParams {
  travelId: string
  onSuccess?: () => void
  onError?: () => void
}

export const useUpdateTravelMutation = ({
  travelId,
  onSuccess,
  onError
}: UseUpdateTravelMutationParams) => {
  return useMutation({
    mutationFn: async (data: UpdateTravelDto) => {
      await fetch(`${API_BASE_URL}/v1/travels/${travelId}`, {
        method: 'PATCH',
        body: JSON.stringify(data)
      })
    },
    onSuccess,
    onError
  })
}
