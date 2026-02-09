import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

/* eslint-disable no-irregular-whitespace */
export const formatTravelDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate)
  const end = new Date(endDate)

  const sameYear = start.getFullYear() === end.getFullYear()
  const sameMonth = sameYear && start.getMonth() === end.getMonth()

  if (sameMonth) {
    // Одинаковый месяц и год: "9 — 21 ноября 2025 г."
    return `${format(start, 'd', { locale: ru })} — ${format(end, 'PPP', { locale: ru })}`
  }

  if (sameYear) {
    // Одинаковый год: "9 октября — 21 ноября 2025 г."
    return `${format(start, 'd MMMM', { locale: ru })} — ${format(end, 'PPP', { locale: ru })}`
  }

  // Разные годы: "9 декабря 2025 г. — 21 января 2026 г."
  return `${format(start, 'PPP', { locale: ru })} — ${format(end, 'PPP', { locale: ru })}`
}
