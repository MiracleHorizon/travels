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
