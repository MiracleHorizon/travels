import { useState } from 'react'
import { DateRange } from 'react-day-picker'

import { TravelApi } from '@/entities/travel'

interface UseCreateTravelProps {
  onCreated?: () => void
}

interface TravelFormData {
  destination: string
  dateRange: DateRange
  tags: string[]
}

const DEFAULT_FORM_DATA: TravelFormData = {
  destination: '',
  dateRange: { from: undefined, to: undefined },
  tags: []
} as const

export const useCreateTravel = ({ onCreated }: UseCreateTravelProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<TravelFormData>(DEFAULT_FORM_DATA)

  const resetForm = () => {
    setFormData(DEFAULT_FORM_DATA)
    setError(null)
  }

  const createTravel = async () => {
    if (!formData.destination.trim()) {
      setError('Укажите направление')
      return
    }

    if (!formData.dateRange?.from || !formData.dateRange?.to) {
      setError('Выберите даты')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await TravelApi.create({
        destination: formData.destination,
        startDate: formData.dateRange.from.toISOString(),
        endDate: formData.dateRange.to.toISOString(),
        tags: formData.tags
      })

      resetForm()
      setIsOpen(false)
      onCreated?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при создании путешествия')
    } finally {
      setIsLoading(false)
    }
  }

  const openChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      resetForm()
    }
  }

  return {
    isOpen,
    isLoading,
    error,
    formData,
    setFormData,
    createTravel,
    openChange
  }
}
