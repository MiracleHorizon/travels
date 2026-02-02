import { Badge } from '@/shared/ui'
import { EXPENSE_CATEGORIES } from '../model/types'
import type { ExpenseCategory } from '../model/types'
import { Plane, Home, UtensilsCrossed, FerrisWheel, DollarSign, Ellipsis } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface ExpenseBadgeProps {
  category: ExpenseCategory
}

const CATEGORY_ICONS: Record<ExpenseCategory, LucideIcon> = {
  transport: Plane,
  accommodation: Home,
  food: UtensilsCrossed,
  entertainment: FerrisWheel,
  shopping: DollarSign,
  other: Ellipsis
}

export const ExpenseBadge = ({ category }: ExpenseBadgeProps) => {
  const Icon = CATEGORY_ICONS[category]

  return (
    <Badge variant='outline' className='gap-1.5'>
      <Icon className='size-3' />
      {EXPENSE_CATEGORIES[category]}
    </Badge>
  )
}
