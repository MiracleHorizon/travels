import type { Expense } from './types'

export const splitExpensesByCurrency = (expenses: Expense[]) => {
  const mapa = new Map<string, number>()

  for (const expense of expenses) {
    const key = expense.currency
    const amount = Number(expense.amount)

    if (mapa.has(key)) {
      const item = mapa.get(key)!
      mapa.set(key, item + amount)
    } else {
      mapa.set(key, amount)
    }
  }

  return Array.from(mapa).map(([currency, amount]) => ({
    currency,
    amount
  }))
}
