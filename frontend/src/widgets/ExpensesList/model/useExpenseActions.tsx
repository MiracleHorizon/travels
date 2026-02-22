import { useTranslation } from 'react-i18next'
import { DropdownAction } from '@/shared/ui'
import { Pencil, Trash } from 'lucide-react'
import { useDeleteExpenseAction } from '@/features/expense/delete'
import { useUpdateExpenseAction } from '@/features/expense/update'
import type { Expense } from '@/entities/expense'

interface UseExpenseActionsParams {
  travelId: string
}

export const useExpenseActions = ({
  travelId
}: UseExpenseActionsParams): ((expense: Expense) => DropdownAction[]) => {
  const { t } = useTranslation()
  const deleteExpenseAction = useDeleteExpenseAction()
  const updateExpenseAction = useUpdateExpenseAction()

  return (expense: Expense) => [
    {
      type: 'item',
      label: t('nav.edit'),
      icon: <Pencil />,
      onClick: () => updateExpenseAction(expense)
    },
    {
      type: 'separator'
    },
    {
      type: 'item',
      label: t('form.delete'),
      icon: <Trash />,
      variant: 'destructive',
      onClick: () => deleteExpenseAction(travelId, expense.id, expense.title)
    }
  ]
}
