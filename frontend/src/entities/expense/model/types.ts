export interface Expense {
  id: string
  travel_id: string
  title: string
  amount: number
  currency: string
  category: ExpenseCategory
  date?: string
  description?: string
  link?: string
}

export enum ExpenseCategory {
  TRANSPORT = 'transport',
  ACCOMMODATION = 'accommodation',
  FOOD = 'food',
  ENTERTAINMENT = 'entertainment',
  SHOPPING = 'shopping',
  OTHER = 'other'
}
