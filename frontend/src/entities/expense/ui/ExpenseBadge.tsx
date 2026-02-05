import { Badge } from '@/shared/ui'
import { EXPENSE_CATEGORIES, EXPENSE_CATEGORY_ICONS } from '../model/consts'
import type { ExpenseCategory } from '../model/types'

interface ExpenseBadgeProps {
  category: ExpenseCategory
}

export const ExpenseBadge = ({ category }: ExpenseBadgeProps) => {
  const Icon = EXPENSE_CATEGORY_ICONS[category]

  return (
    <Badge variant='outline' className='gap-1.5'>
      <Icon className='size-3' />
      {EXPENSE_CATEGORIES[category]}
    </Badge>
  )
}
