import { format } from 'date-fns'

import { getDateFnsLocale, type AppLocale } from '@/shared/lib/i18n'

interface FormatTravelDateRangeParams {
  startDate: string
  endDate: string
  locale: AppLocale
}

export const formatTravelDateRange = ({
  startDate,
  endDate,
  locale
}: FormatTravelDateRangeParams) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const dateFnsLocale = getDateFnsLocale(locale)

  const sameYear = start.getFullYear() === end.getFullYear()
  const sameMonth = sameYear && start.getMonth() === end.getMonth()

  if (sameMonth) {
    return `${format(start, 'd', {
      locale: dateFnsLocale
    })} — ${format(end, 'PPP', {
      locale: dateFnsLocale
    })}`
  }

  if (sameYear) {
    return `${format(start, 'd MMMM', {
      locale: dateFnsLocale
    })} — ${format(end, 'PPP', {
      locale: dateFnsLocale
    })}`
  }

  return `${format(start, 'PPP', {
    locale: dateFnsLocale
  })} — ${format(end, 'PPP', {
    locale: dateFnsLocale
  })}`
}
