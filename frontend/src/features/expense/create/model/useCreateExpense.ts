import { useState } from 'react'
import { useTranslation } from 'react-i18next'
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
  link: string | undefined
}

const DEFAULT_FORM_FIELDS: ExpenseFormFields = {
  title: '',
  amount: '',
  description: '',
  date: undefined,
  category: undefined,
  link: undefined
} as const

export const useCreateExpense = ({ travelId }: { travelId: string }) => {
  const { t } = useTranslation()
  const [formFields, setFormFields] = useState<ExpenseFormFields>(DEFAULT_FORM_FIELDS)

  const queryClient = useQueryClient()
  const hideModal = useHideModal()

  const { isPending, error, mutate } = useCreateExpenseMutation({ travelId })

  const createExpense = () => {
    if (!formFields.title.trim() || !formFields.amount.trim() || !formFields.category) {
      return
    }

    const amount = parseFloat(formFields.amount)
    if (isNaN(amount) || amount <= 0) {
      return
    }

    mutate(
      {
        amount,
        title: formFields.title,
        description: formFields.description,
        date: formFields.date ? formFields.date.toISOString() : undefined,
        category: formFields.category,
        link: formFields.link?.trim() || undefined
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [EXPENSES_QUERY_KEY, travelId]
          })
          hideModal()
          toast.success(t('toast.expense.created'))
        },
        onError: () => {
          toast.error(t('toast.expense.createError'), {
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
    createExpense
  }
}
