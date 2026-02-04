import { Plane, Home, UtensilsCrossed, FerrisWheel, DollarSign, Ellipsis } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Expense {
  id: string | number
  travel_id: string
  title: string
  amount: number
  currency: string
  category: ExpenseCategory
  date?: string
  description?: string
  createdAt?: string
  updatedAt?: string
}

export type ExpenseCategory =
  | 'transport'
  | 'accommodation'
  | 'food'
  | 'entertainment'
  | 'shopping'
  | 'other'

export const EXPENSE_CATEGORIES: Record<ExpenseCategory, string> = {
  transport: 'Транспорт',
  accommodation: 'Проживание',
  food: 'Еда',
  entertainment: 'Развлечения',
  shopping: 'Покупки',
  other: 'Прочее'
}

export const EXPENSE_CATEGORY_ICONS: Record<ExpenseCategory, LucideIcon> = {
  transport: Plane,
  accommodation: Home,
  food: UtensilsCrossed,
  entertainment: FerrisWheel,
  shopping: DollarSign,
  other: Ellipsis
}
