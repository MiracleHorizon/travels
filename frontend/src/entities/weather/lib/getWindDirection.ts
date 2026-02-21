import type { WeatherLocale } from '../config/locales'
import { WEATHER_LOCALES } from '../config'

const WIND_GRADUATION = 45
const WIND_DIRECTIONS_COUNT = 8

export const getWindDirection = (
  deg: number | null,
  locale: WeatherLocale = 'ru'
): string | null => {
  if (deg == null) {
    return null
  }

  const { windDirections } = WEATHER_LOCALES[locale]
  const index = Math.round(deg / WIND_GRADUATION) % WIND_DIRECTIONS_COUNT

  return windDirections[index >= 0 ? index : index + WIND_DIRECTIONS_COUNT]
}
