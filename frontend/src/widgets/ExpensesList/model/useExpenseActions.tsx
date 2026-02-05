import { DropdownAction } from '@/shared/ui'
import { Pencil, Trash } from 'lucide-react'
import { useDeleteExpenseAction } from '@/features/expense/delete'
import type { Expense } from '@/entities/expense'

interface UseExpenseActionsParams {
  travelId: string
}

export const useExpenseActions = ({
  travelId
}: UseExpenseActionsParams): ((expense: Expense) => DropdownAction[]) => {
  const deleteExpenseAction = useDeleteExpenseAction()

  const editExpense = (expenseId: string | number) => {
    console.log('editExpense', expenseId)
  }

  return (expense: Expense) => [
    {
      type: 'item',
      label: 'Редактировать',
      icon: <Pencil />,
      onClick: () => editExpense(expense.id)
    },
    {
      type: 'separator'
    },
    {
      type: 'item',
      label: 'Удалить',
      icon: <Trash />,
      variant: 'destructive',
      onClick: () => deleteExpenseAction(travelId, expense.id, expense.title)
    }
  ]
}
