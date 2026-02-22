import { ru, enUS } from 'date-fns/locale'
import type { Locale as DateFnsLocale } from 'date-fns'

export type WeatherLocale = 'ru' | 'en'

/**
 * Коды языков OpenWeather API: https://openweathermap.org/api/one-call-3#multi
 */
export const OPENWEATHER_LANG: Record<WeatherLocale, string> = {
  ru: 'ru',
  en: 'en'
} as const

export type WeatherUnits = 'metric' | 'imperial'
export type TemperatureUnit = '°C' | '°F'

export const DATE_FNS_LOCALES: Record<WeatherLocale, DateFnsLocale> = {
  ru,
  en: enUS
}

export const DEFAULT_WEATHER_LOCALE: WeatherLocale = 'ru'
