import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { TRAVELS_QUERY_KEY } from '@/entities/travel'
import { useHideModal } from '@/shared/lib/modal'
import { useDeleteTravelMutation } from '../api/useDeleteTravelMutation'

export const useDeleteTravel = (travelId: string) => {
  const queryClient = useQueryClient()
  const hideModal = useHideModal()

  const { isPending, mutate } = useDeleteTravelMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TRAVELS_QUERY_KEY]
      })
      hideModal()
      toast.success('Путешествие удалено')
    },
    onError: () => {
      toast.error('Не удалось удалить путешествие', {
        description: 'Пожалуйста, попробуйте еще раз'
      })
    }
  })

  const deleteTravel = () => mutate(travelId)

  return {
    isLoading: isPending,
    deleteTravel
  }
}
