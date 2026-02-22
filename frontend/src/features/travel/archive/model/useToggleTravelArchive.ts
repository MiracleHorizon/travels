import { useTranslation } from 'react-i18next'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { TRAVELS_QUERY_KEY } from '@/entities/travel'
import { useToggleTravelArchiveMutation } from '../api/useToggleTravelArchiveMutation'

export const useToggleTravelArchive = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { isPending, mutate } = useToggleTravelArchiveMutation()

  const toggleArchive = (travelId: string, isArchived: boolean) => {
    mutate(
      {
        travelId,
        isArchived
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [TRAVELS_QUERY_KEY]
          })

          if (isArchived) {
            toast.success(t('toast.travel.archived'))
          } else {
            toast.success(t('toast.travel.restored'))
          }
        },
        onError: () => {
          toast.error(t('toast.travel.archiveError'), {
            description: t('toast.tryAgain')
          })
        }
      }
    )
  }

  return {
    isPending,
    toggleArchive
  }
}
