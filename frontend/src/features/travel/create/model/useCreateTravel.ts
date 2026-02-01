import { useState } from 'react'
import { DateRange } from 'react-day-picker'

import { useHideModal } from '@/shared/lib'
import { useCreateTravelMutation } from '../api/mutation'
import { useQueryClient } from '@tanstack/react-query'
import { TRAVELS_QUERY_KEY } from '@/entities/travel'

interface TravelFormFields {
  name: string
  description: string
  dateRange: DateRange
  tags: string[]
}

const DEFAULT_FORM_FIELDS: TravelFormFields = {
  name: '',
  description: '',
  dateRange: { from: undefined, to: undefined },
  tags: []
} as const

export const useCreateTravel = () => {
  const [formFields, setFormFields] = useState<TravelFormFields>(DEFAULT_FORM_FIELDS)

  const queryClient = useQueryClient()
  const hideModal = useHideModal()

  const { isPending, error, mutate } = useCreateTravelMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TRAVELS_QUERY_KEY]
      })
      hideModal()
    }
  })

  // TODO: Нужно сделать валидацию формы
  const createTravel = async () => {
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
    createTravel
  }
}
