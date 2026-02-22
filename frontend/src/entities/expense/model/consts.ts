import {
  DollarSign,
  Ellipsis,
  FerrisWheel,
  Home,
  type LucideIcon,
  Plane,
  UtensilsCrossed
} from 'lucide-react'
import { ExpenseCategory } from './types'

export const EXPENSE_CATEGORY_ICONS: Record<ExpenseCategory, LucideIcon> = {
  transport: Plane,
  accommodation: Home,
  food: UtensilsCrossed,
  entertainment: FerrisWheel,
  shopping: DollarSign,
  other: Ellipsis
} as const

export const EXPENSE_CHART_COLORS: Record<ExpenseCategory, string> = {
  transport: 'hsl(199, 89%, 48%)',
  accommodation: 'hsl(271, 91%, 65%)',
  food: 'hsl(25, 95%, 53%)',
  entertainment: 'hsl(330, 81%, 60%)',
  shopping: 'hsl(160, 84%, 39%)',
  other: 'hsl(220, 9%, 46%)'
} as const
