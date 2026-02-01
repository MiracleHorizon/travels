import { useState } from 'react'
import { addDays, startOfDay } from 'date-fns'

import { TravelFormData, TravelApi } from '@/entities/travel'

interface UseCreateTravelProps {
  onCreated?: () => void
}

const getInitialFormData = (): TravelFormData => {
  const start = startOfDay(new Date())
  const end = addDays(start, 7)

  return {
    destination: '',
    dateRange: {
      from: start,
      to: end
    },
    tags: []
  }
}

export const useCreateTravel = ({ onCreated }: UseCreateTravelProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<TravelFormData>(getInitialFormData)

  const resetForm = () => {
    setFormData(getInitialFormData())
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
