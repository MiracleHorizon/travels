import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { TRAVELS_QUERY_KEY } from '@/entities/travel'
import { useToggleTravelArchiveMutation } from '../api/useToggleTravelArchiveMutation'

export const useToggleTravelArchive = () => {
  const queryClient = useQueryClient()

  const { isPending, mutate } = useToggleTravelArchiveMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TRAVELS_QUERY_KEY]
      })
    },
    onError: () => {
      toast.error('Не удалось изменить статус архивации', {
        description: 'Пожалуйста, попробуйте еще раз'
      })
    }
  })

  const toggleArchive = (travelId: string, isArchived: boolean) => {
    mutate(
      { travelId, isArchived },
      {
        onSuccess: () => {
          if (isArchived) {
            toast.success(`Путешествие добавлено в архив`)
          } else {
            toast.success(`Путешествие восстановлено из архива`)
          }
        }
      }
    )
  }

  return {
    isLoading: isPending,
    toggleArchive
  }
}
