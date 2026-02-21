import { format } from 'date-fns'
import type { WeatherLocale } from '../config/locales'
import { WEATHER_LOCALES } from '../config'
import type { ForecastItem, DayForecast } from './types'

const getLocalDateKey = (dt: number) => format(new Date(dt * 1000), 'yyyy-MM-dd')
const getLocalHour = (dt: number) => new Date(dt * 1000).getHours()

const NOON_HOUR = 12
const findNoonSlot = (slots: ForecastItem[]) => {
  const noon = slots.find(s => getLocalHour(s.dt) === NOON_HOUR)
  if (noon) return noon

  const sorted = [...slots].sort((a, b) => {
    const distA = Math.abs(getLocalHour(a.dt) - NOON_HOUR)
    const distB = Math.abs(getLocalHour(b.dt) - NOON_HOUR)

    return distA - distB
  })

  return sorted[0]
}

export const groupForecastByDay = (
  list: ForecastItem[],
  maxDays = 5,
  locale: WeatherLocale = 'ru'
): DayForecast[] => {
  const { dayAbbr, today: todayLabel } = WEATHER_LOCALES[locale]
  const byDate = new Map<string, ForecastItem[]>()
  for (const item of list) {
    const key = getLocalDateKey(item.dt)
    const group = byDate.get(key) ?? []
    group.push(item)
    byDate.set(key, group)
  }

  const today = format(new Date(), 'yyyy-MM-dd')
  const sortedDates = [...byDate.keys()].sort().filter(d => d >= today)

  return sortedDates.slice(0, maxDays).map(dateKey => {
    const slots = byDate.get(dateKey)!
    const representative = findNoonSlot(slots)
    const temps = slots.map(s => s.main.temp)
    const date = new Date(dateKey + `T${NOON_HOUR}:00:00`)
    const dayName = dateKey === today ? todayLabel : dayAbbr[date.getDay()]
    const maxPop = Math.max(...slots.map(s => s.pop ?? 0), 0)

    return {
      date: dateKey,
      dayName,
      temp: representative.main.temp,
      tempMin: Math.min(...temps),
      tempMax: Math.max(...temps),
      icon: representative.weather[0].icon,
      description: representative.weather[0].description,
      pop: maxPop,
      slots: slots.sort((a, b) => a.dt - b.dt)
    }
  })
}
