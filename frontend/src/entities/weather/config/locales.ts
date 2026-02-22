import { ru, enUS } from 'date-fns/locale'
import type { Locale as DateFnsLocale } from 'date-fns'

/**
 * Коды языков OpenWeather API: https://openweathermap.org/api/one-call-3#multi
 */
export const OPENWEATHER_LANG: Record<WeatherLocale, string> = {
  ru: 'ru',
  en: 'en'
} as const

export type WeatherLocale = keyof typeof WEATHER_LOCALES
export type WeatherUnits = 'metric' | 'imperial'
export type TemperatureUnit = '°C' | '°F'

export const DATE_FNS_LOCALES: Record<WeatherLocale, DateFnsLocale> = {
  ru,
  en: enUS
}
export const DEFAULT_WEATHER_LOCALE: WeatherLocale = 'ru'

// TODO: i18n
export const WEATHER_LOCALES = {
  ru: {
    windDirections: ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'] as const,
    today: 'Сегодня',
    feelsLike: 'ощущается как',
    forecast: 'Прогноз',
    unavailable: 'Погода недоступна'
  },
  en: {
    windDirections: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] as const,
    today: 'Today',
    feelsLike: 'feels like',
    forecast: 'Forecast',
    unavailable: 'Weather unavailable'
  }
} as const
