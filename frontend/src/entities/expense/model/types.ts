export interface Expense {
  id: string
  travelId: string
  title: string
  amount: number
  currency: string
  category: ExpenseCategory
  date: string
  description?: string
  createdAt: string
  updatedAt: string
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
