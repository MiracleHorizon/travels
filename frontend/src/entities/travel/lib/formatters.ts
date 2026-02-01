import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export const formatTravelDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate)
  const end = new Date(endDate)

  return `${format(start, 'PPP', {
    locale: ru
  })} — ${format(end, 'PPP', {
    locale: ru
  })}`
}
