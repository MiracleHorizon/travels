import { API_BASE_URL } from '@/shared/api'
import { useMutation } from '@tanstack/react-query'

interface ToggleTravelArchiveParams {
  travelId: string
  isArchived: boolean
}

export const useToggleTravelArchiveMutation = ({
  onSuccess,
  onError
}: {
  onSuccess?: () => void
  onError?: (error: unknown) => void
} = {}) => {
  return useMutation({
    mutationFn: async ({ travelId, isArchived }: ToggleTravelArchiveParams) => {
      const response = await fetch(`${API_BASE_URL}/v1/travels/${travelId}/archive`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          is_archived: isArchived
        })
      })

      if (!response.ok) {
        throw new Error('Failed to toggle travel archive')
      }

      return response.json()
    },
    onSuccess,
    onError
  })
}
