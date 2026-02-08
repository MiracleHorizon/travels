import type { Expense } from './types'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

const NO_DATE_FLAG = 'no_date'

interface DayTotal {
  day: string
  transport: number
  accommodation: number
  food: number
  entertainment: number
  shopping: number
  other: number
}

export const useBarExpenses = (expenses: Expense[]) => {
  // Группируем расходы по дням и категориям
  const dayTotals = expenses.reduce(
      (acc, expense) => {
        // Если даты нет, используем "День 0"
        const day = expense.date || NO_DATE_FLAG

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
      {} as Record<string, DayTotal>
    )

    const sortedData = Object.values(dayTotals).sort((a, b) => {
      // "День 0" всегда первый
      if (a.day === NO_DATE_FLAG) return -1
      if (b.day === NO_DATE_FLAG) return 1

      // Остальное сортируем по дате
      return new Date(a.day).getTime() - new Date(b.day).getTime()
    })

    // Проверяем, есть ли расходы без даты
    const hasNoDayExpenses = sortedData.some(item => item.day === NO_DATE_FLAG)

    return sortedData.map((item, index) => {
      if (item.day === NO_DATE_FLAG) {
        return {
          ...item,
          dayLabel: 'Без даты'
        }
      }

      const date = new Date(item.day)
      // Если есть "Без даты", то первый реальный день будет иметь индекс 1, иначе 0
      // Но нумерация дней должна начинаться с 1
      const dayNumber = hasNoDayExpenses ? index : index + 1
      const formattedDate = format(date, 'dd.MM.yyyy', { locale: ru })

      return {
        ...item,
        // eslint-disable-next-line no-irregular-whitespace
        dayLabel: `День ${dayNumber} — ${formattedDate}`
      }
    })
}
