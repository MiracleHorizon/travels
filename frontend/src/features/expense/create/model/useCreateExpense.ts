import { useState } from 'react'
import { useHideModal } from '@/shared/lib/modal'
import { useCreateExpenseMutation } from '../api/useCreateExpenseMutation'
import { useQueryClient } from '@tanstack/react-query'
import { ExpenseCategory, EXPENSES_QUERY_KEY } from '@/entities/expense'
import { toast } from 'sonner'

interface ExpenseFormFields {
  title: string
  amount: string
  description: string
  date: Date | undefined
  category: ExpenseCategory | undefined
}

const DEFAULT_FORM_FIELDS: ExpenseFormFields = {
  title: '',
  amount: '',
  description: '',
  date: undefined,
  category: undefined
} as const

export const useCreateExpense = ({ travelId }: { travelId: string }) => {
  const [formFields, setFormFields] = useState<ExpenseFormFields>(DEFAULT_FORM_FIELDS)

  const queryClient = useQueryClient()
  const hideModal = useHideModal()

  const { isPending, error, mutate } = useCreateExpenseMutation({
    travelId,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [EXPENSES_QUERY_KEY, travelId]
      })
      hideModal()
      toast.success('Расход добавлен')
    },
    onError: () => {
      toast.error('Не удалось добавить расход', {
        description: 'Пожалуйста, попробуйте еще раз'
      })
    }
  })

  const createExpense = async () => {
    if (!formFields.title.trim() || !formFields.amount.trim() || !formFields.category) {
      return
    }

    const amount = parseFloat(formFields.amount)
    if (isNaN(amount) || amount <= 0) {
      return
    }

    mutate({
      amount,
      title: formFields.title,
      description: formFields.description,
      date: formFields.date ? formFields.date.toISOString() : undefined,
      category: formFields.category
    })
  }

  return {
    error,
    isLoading: isPending,
    formFields,
    setFormFields,
    createExpense
  }
}
