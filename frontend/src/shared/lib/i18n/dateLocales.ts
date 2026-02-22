import { ru as ruDateFns, enUS } from 'date-fns/locale'
import type { Locale as DateFnsLocale } from 'date-fns'
import { ru as ruDayPicker, enUS as enUSDayPicker } from 'react-day-picker/locale'
import type { Locale as DayPickerLocale } from 'react-day-picker'

interface LocaleConfig {
  dateFns: DateFnsLocale
  dayPicker: DayPickerLocale
  /** Строка для Intl и форматирования (например en-US, ru-RU) */
  localeString: string
}

const APP_LOCALES = {
  ru: {
    dateFns: ruDateFns,
    dayPicker: ruDayPicker,
    localeString: 'ru-RU'
  },
  en: {
    dateFns: enUS,
    dayPicker: enUSDayPicker,
    localeString: 'en-US'
  }
} as const satisfies Record<string, LocaleConfig>

export type AppLocale = keyof typeof APP_LOCALES

const DEFAULT_LOCALE: AppLocale = 'en'

const getConfig = (locale: AppLocale): LocaleConfig =>
  APP_LOCALES[locale] ?? APP_LOCALES[DEFAULT_LOCALE]

export const getDateFnsLocale = (locale: AppLocale): DateFnsLocale =>
  getConfig(locale).dateFns

export const getDayPickerLocale = (locale: AppLocale): DayPickerLocale =>
  getConfig(locale).dayPicker

export const getLocaleString = (locale: AppLocale): string =>
  getConfig(locale).localeString
