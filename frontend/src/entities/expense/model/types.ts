export interface Expense {
  id: string
  travel_id: string
  title: string
  amount: number
  currency: string
  category: ExpenseCategory
  date?: string
  description?: string
}

export type ExpenseCategory =
  | 'transport'
  | 'accommodation'
  | 'food'
  | 'entertainment'
  | 'shopping'
  | 'other'
