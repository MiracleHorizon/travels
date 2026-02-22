import { useTranslation } from 'react-i18next'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { TRAVELS_QUERY_KEY } from '@/entities/travel'
import { useHideModal } from '@/shared/lib/modal'
import { useDeleteTravelMutation } from '../api/useDeleteTravelMutation'

export const useDeleteTravel = (travelId: string) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const hideModal = useHideModal()

  const { isPending, mutate } = useDeleteTravelMutation()

  const deleteTravel = () =>
    mutate(travelId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [TRAVELS_QUERY_KEY]
        })
        hideModal()
        toast.success(t('toast.travel.deleted'))
      },
      onError: () => {
        toast.error(t('toast.travel.deleteError'), {
          description: t('toast.tryAgain')
        })
      }
    })

  return {
    isPending,
    deleteTravel
  }
}
