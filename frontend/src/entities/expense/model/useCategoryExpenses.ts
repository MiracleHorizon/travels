import { useMemo } from 'react'
import type { Expense } from './types'

export interface CategoryExpense {
  category: string
  amount: number
  count: number
}

interface UseCategoryExpensesParams {
  expenses: Expense[]
}

export const useCategoryExpenses = ({ expenses }: UseCategoryExpensesParams) => {
  const categoryExpenses = useMemo(() => {
    return expenses
      .reduce((acc, expense) => {
        const existing = acc.find(item => item.category === expense.category)
        if (existing) {
          existing.amount += +expense.amount
          existing.count += 1
        } else {
          acc.push({
            category: expense.category,
            amount: +expense.amount,
            count: 1
          })
        }
        return acc
      }, [] as CategoryExpense[])
      .sort((a, b) => b.amount - a.amount)
  }, [expenses])

  const total = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + +expense.amount, 0)
  }, [expenses])

  return { categoryExpenses, total }
}
