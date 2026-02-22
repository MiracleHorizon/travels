import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DateRange } from 'react-day-picker'

import { useHideModal } from '@/shared/lib/modal'
import { useUpdateTravelMutation } from '../api/useUpdateTravelMutation'
import { useQueryClient } from '@tanstack/react-query'
import { TRAVELS_QUERY_KEY, type TravelDetailed } from '@/entities/travel'
import { toast } from 'sonner'
import { GeoLocationResult } from '@/shared/api/geo'

interface TravelFormFields {
  name: string
  description: string
  dateRange: DateRange | undefined
  tags: string[]
  destination: GeoLocationResult | null
}

interface UseUpdateTravelProps {
  travel: TravelDetailed
}

export const useUpdateTravel = ({ travel }: UseUpdateTravelProps) => {
  const { t } = useTranslation()
  const [formFields, setFormFields] = useState<TravelFormFields>({
    name: travel.name,
    description: travel.description || '',
    dateRange: {
      from: new Date(travel.start_date),
      to: new Date(travel.end_date)
    },
    tags: travel.tags || [],
    destination: travel.coords
      ? {
          text: `${travel.coords.lat.toFixed(4)}, ${travel.coords.lng.toFixed(4)}`,
          coords: travel.coords
        }
      : null
  })

  const queryClient = useQueryClient()
  const hideModal = useHideModal()

  const { isPending, error, mutate } = useUpdateTravelMutation()

  // TODO: Нужно сделать валидацию формы
  const updateTravel = () => {
    if (!formFields.name.trim()) {
      return
    }

    if (!formFields.dateRange?.from || !formFields.dateRange?.to) {
      return
    }

    mutate(
      {
        travelId: travel.id,
        name: formFields.name,
        description: formFields.description || undefined,
        startDate: formFields.dateRange.from.toISOString(),
        endDate: formFields.dateRange.to.toISOString(),
        tags: formFields.tags,
        coords: formFields.destination.coords
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [TRAVELS_QUERY_KEY]
          })
          hideModal()
          toast.success(t('toast.travel.updated'))
        },
        onError: () => {
          toast.error(t('toast.travel.updateError'), {
            description: t('toast.tryAgain')
          })
        }
      }
    )
  }

  return {
    error,
    isPending,
    formFields,
    setFormFields,
    updateTravel
  }
}
