import { useMemo } from 'react'

import type { Expense, ExpenseCategory } from './types'

export const usePieExpenses = (expenses: Expense[]) => {
  return useMemo(() => {
    // Группируем расходы по категориям
    const categoryTotals = expenses.reduce(
      (acc, expense) => {
        const category = expense.category
        acc[category] = (acc[category] || 0) + +expense.amount

        return acc
      },
      {} as Record<ExpenseCategory, number>
    )

    // Преобразуем в формат для графика
    return (
      Object.entries(categoryTotals)
        .map(([category, amount]) => ({
          category,
          amount,
          fill: `var(--color-${category})`
        }))
        // Сортируем по убыванию суммы
        .sort((a, b) => b.amount - a.amount)
    )
  }, [expenses])
}
