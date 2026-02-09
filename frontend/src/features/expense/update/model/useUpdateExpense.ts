import { useState } from 'react'
import { useHideModal } from '@/shared/lib/modal'
import { useUpdateExpenseMutation } from '../api/useUpdateExpenseMutation'
import { useQueryClient } from '@tanstack/react-query'
import { ExpenseCategory, EXPENSES_QUERY_KEY, Expense } from '@/entities/expense'
import { toast } from 'sonner'

interface ExpenseFormFields {
  title: string
  amount: string
  description: string
  date: Date | undefined
  category: ExpenseCategory | undefined
  link: string | undefined
}

interface UseUpdateExpenseParams {
  expense: Expense
}

export const useUpdateExpense = ({ expense }: UseUpdateExpenseParams) => {
  const [formFields, setFormFields] = useState<ExpenseFormFields>({
    title: expense.title,
    amount: expense.amount.toString(),
    description: expense.description || '',
    date: expense.date ? new Date(expense.date) : undefined,
    category: expense.category,
    link: expense.link
  })

  const queryClient = useQueryClient()
  const hideModal = useHideModal()

  const { isPending, error, mutate } = useUpdateExpenseMutation({
    expenseId: expense.id
  })

  const updateExpense = () => {
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
        description: formFields.description || undefined,
        date: formFields.date ? formFields.date.toISOString() : undefined,
        category: formFields.category,
        link: formFields.link?.trim() || undefined
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [EXPENSES_QUERY_KEY, expense.travel_id]
          })
          hideModal()
          toast.success('Расход обновлен')
        },
        onError: () => {
          toast.error('Не удалось обновить расход', {
            description: 'Пожалуйста, попробуйте еще раз'
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
    updateExpense
  }
}
