import type { Expense } from './types'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

import { getDateFnsLocale, type AppLocale } from '@/shared/lib/i18n'
import { useSettings } from '@/features/settings'

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
  const { t } = useTranslation()
  const { getSetting } = useSettings()
  const appLocale = (getSetting('locale') ?? 'ru') as AppLocale
  const dateFnsLocale = getDateFnsLocale(appLocale)
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

  return sortedData.map(item => {
    if (item.day === NO_DATE_FLAG) {
      return {
        ...item,
        dayLabel: t('form.expense.noDate')
      }
    }

    const date = new Date(item.day)
    const formattedDate = format(date, 'dd.MM.yyyy', { locale: dateFnsLocale })

    return {
      ...item,
      dayLabel: formattedDate
    }
  })
}
