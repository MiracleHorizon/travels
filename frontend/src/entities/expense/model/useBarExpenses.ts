import { useMemo } from 'react'

import type { Expense } from './types'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export const useBarExpenses = (expenses: Expense[]) => {
  return useMemo(() => {
    // Группируем расходы по дням и категориям
    const dayTotals = expenses.reduce(
      (acc, expense) => {
        // Если даты нет, используем "День 0"
        const day = expense.date || 'День 0'

        if (!acc[day]) {
          acc[day] = {
            day,
            transport: 0,
            accommodation: 0,
            food: 0,
            entertainment: 0,
            shopping: 0,
            other: 0
          }
        }

        acc[day][expense.category] += +expense.amount
        return acc
      },
      {} as Record<
        string,
        {
          day: string
          transport: number
          accommodation: number
          food: number
          entertainment: number
          shopping: number
          other: number
        }
      >
    )

    // Преобразуем в массив и сортируем
    const sortedData = Object.values(dayTotals).sort((a, b) => {
      // "День 0" всегда первый
      if (a.day === 'День 0') return -1
      if (b.day === 'День 0') return 1

      // Остальные сортируем по дате
      return new Date(a.day).getTime() - new Date(b.day).getTime()
    })

    // Форматируем названия дней
    return sortedData.map((item, index) => {
      if (item.day === 'День 0') {
        return { ...item, dayLabel: 'Без даты' }
      }

      const date = new Date(item.day)
      const dayNumber = index // Номер дня в путешествии (начиная с 0 для "Без даты")
      const formattedDate = format(date, 'dd.MM.yyyy', { locale: ru })

      return {
        ...item,
        dayLabel: `День ${dayNumber} - ${formattedDate}`
      }
    })
  }, [expenses])
}
