import type { Expense, ExpenseCategory } from '@/entities/expense'

const CATEGORY_ORDER: ExpenseCategory[] = [
  'transport',
  'accommodation',
  'food',
  'entertainment',
  'shopping',
  'other'
] as const

const groupExpensesByCategory = (expenses: Expense[]) => {
  const groups = new Map<ExpenseCategory, Expense[]>()

  for (const category of CATEGORY_ORDER) {
    groups.set(category, [])
  }

  for (const expense of expenses) {
    const list = groups.get(expense.category)
    if (list) list.push(expense)
  }

  return groups
}

interface UseExpensesByCategoryParams {
  expenses: Expense[] | undefined
}

export const useExpensesByCategory = ({ expenses }: UseExpensesByCategoryParams) => {
  const groups = expenses
    ? groupExpensesByCategory(expenses)
    : new Map<ExpenseCategory, Expense[]>()

  const categoriesWithExpenses = expenses
    ? (CATEGORY_ORDER.filter(cat => (groups.get(cat)?.length ?? 0) > 0) as ExpenseCategory[]).sort(
        (a, b) => {
          const sumA = (groups.get(a) ?? []).reduce((s, e) => s + +e.amount, 0)
          const sumB = (groups.get(b) ?? []).reduce((s, e) => s + +e.amount, 0)

          return sumB - sumA
        }
      )
    : []

  return { groups, categoriesWithExpenses }
}
