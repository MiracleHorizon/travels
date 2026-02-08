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
import { ChartConfig } from '@/shared/ui/chart'

export const EXPENSE_CATEGORIES: Record<ExpenseCategory, string> = {
  transport: 'Транспорт',
  accommodation: 'Проживание',
  food: 'Еда',
  entertainment: 'Развлечения',
  shopping: 'Покупки',
  other: 'Прочее'
} as const

export const EXPENSE_CATEGORY_ICONS: Record<ExpenseCategory, LucideIcon> = {
  transport: Plane,
  accommodation: Home,
  food: UtensilsCrossed,
  entertainment: FerrisWheel,
  shopping: DollarSign,
  other: Ellipsis
} as const

export const EXPENSE_CHART_CATEGORIES = {
  transport: {
    label: EXPENSE_CATEGORIES.transport,
    color: 'hsl(199, 89%, 48%)'
  },
  accommodation: {
    label: EXPENSE_CATEGORIES.accommodation,
    color: 'hsl(271, 91%, 65%)'
  },
  food: {
    label: EXPENSE_CATEGORIES.food,
    color: 'hsl(25, 95%, 53%)'
  },
  entertainment: {
    label: EXPENSE_CATEGORIES.entertainment,
    color: 'hsl(330, 81%, 60%)'
  },
  shopping: {
    label: EXPENSE_CATEGORIES.shopping,
    color: 'hsl(160, 84%, 39%)'
  },
  other: {
    label: EXPENSE_CATEGORIES.other,
    color: 'hsl(220, 9%, 46%)'
  }
} as const satisfies ChartConfig
