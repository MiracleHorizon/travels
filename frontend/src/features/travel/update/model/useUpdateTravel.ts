import { useState } from 'react'
import { DateRange } from 'react-day-picker'

import { useHideModal } from '@/shared/lib/modal'
import { useUpdateTravelMutation } from '../api/useUpdateTravelMutation'
import { useQueryClient } from '@tanstack/react-query'
import { TRAVELS_QUERY_KEY, Travel } from '@/entities/travel'
import { toast } from 'sonner'

interface TravelFormFields {
  name: string
  description: string
  dateRange: DateRange | undefined
  tags: string[]
}

interface UseUpdateTravelParams {
  travel: Travel
}

export const useUpdateTravel = ({ travel }: UseUpdateTravelParams) => {
  const [formFields, setFormFields] = useState<TravelFormFields>({
    name: travel.name,
    description: travel.description || '',
    dateRange: {
      from: new Date(travel.start_date),
      to: new Date(travel.end_date)
    },
    tags: travel.tags || []
  })

  const queryClient = useQueryClient()
  const hideModal = useHideModal()

  const { isPending, error, mutate } = useUpdateTravelMutation({
    travelId: travel.id,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TRAVELS_QUERY_KEY]
      })
      hideModal()
      toast.success('Путешествие обновлено')
    },
    onError: () => {
      toast.error('Не удалось обновить путешествие', {
        description: 'Пожалуйста, попробуйте еще раз'
      })
    }
  })

  // TODO: Нужно сделать валидацию формы
  const updateTravel = async () => {
    if (!formFields.name.trim()) {
      return
    }

    if (!formFields.dateRange?.from || !formFields.dateRange?.to) {
      return
    }

    mutate({
      name: formFields.name,
      description: formFields.description || undefined,
      startDate: formFields.dateRange.from.toISOString(),
      endDate: formFields.dateRange.to.toISOString(),
      tags: formFields.tags
    })
  }

  return {
    error,
    isLoading: isPending,
    formFields,
    setFormFields,
    updateTravel
  }
}
