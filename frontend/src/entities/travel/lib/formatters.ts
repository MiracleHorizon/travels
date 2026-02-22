import { format } from 'date-fns'

import { getDateFnsLocale, type AppLocale } from '@/shared/lib/i18n'

/* eslint-disable no-irregular-whitespace */
export const formatTravelDateRange = (
  startDate: string,
  endDate: string,
  locale: AppLocale = 'ru'
) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const dateFnsLocale = getDateFnsLocale(locale)

  const sameYear = start.getFullYear() === end.getFullYear()
  const sameMonth = sameYear && start.getMonth() === end.getMonth()

  if (sameMonth) {
    return `${format(start, 'd', { locale: dateFnsLocale })} — ${format(end, 'PPP', { locale: dateFnsLocale })}`
  }

  if (sameYear) {
    return `${format(start, 'd MMMM', { locale: dateFnsLocale })} — ${format(end, 'PPP', { locale: dateFnsLocale })}`
  }

  return `${format(start, 'PPP', { locale: dateFnsLocale })} — ${format(end, 'PPP', { locale: dateFnsLocale })}`
}
