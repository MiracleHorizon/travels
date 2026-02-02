import { DropdownAction } from '@/shared/ui'
import { Pencil, Trash } from 'lucide-react'

export const useExpenseActions = (): ((expenseId: string) => DropdownAction[]) => {
  const editExpense = (expenseId: string) => {
    console.log('editExpense', expenseId)
  }
  const deleteExpense = (expenseId: string) => {
    console.log('deleteExpense', expenseId)
  }

  return (expenseId: string) => [
    {
      type: 'item',
      label: 'Редактировать',
      icon: <Pencil />,
      onClick: () => editExpense(expenseId)
    },
    {
      type: 'separator'
    },
    {
      type: 'item',
      label: 'Удалить',
      icon: <Trash />,
      variant: 'destructive',
      onClick: () => deleteExpense(expenseId)
    }
  ]
}
