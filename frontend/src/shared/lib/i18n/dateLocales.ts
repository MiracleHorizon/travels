import { ru as ruDateFns, enUS } from 'date-fns/locale'
import type { Locale as DateFnsLocale } from 'date-fns'
import { ru as ruDayPicker, enUS as enUSDayPicker } from 'react-day-picker/locale'
import type { Locale as DayPickerLocale } from 'react-day-picker'

interface LocaleConfig {
  dateFns: DateFnsLocale
  dayPicker: DayPickerLocale
  localeString: AppLocaleString
}

export const enum AppLocaleString {
  RU = 'ru-RU',
  EN = 'en-US'
}

export const enum AppLocale {
  RU = 'ru',
  EN = 'en'
}

const APP_LOCALES: Record<AppLocale, LocaleConfig> = {
  [AppLocale.RU]: {
    dateFns: ruDateFns,
    dayPicker: ruDayPicker,
    localeString: AppLocaleString.RU
  },
  [AppLocale.EN]: {
    dateFns: enUS,
    dayPicker: enUSDayPicker,
    localeString: AppLocaleString.EN
  }
} as const

export const DEFAULT_LOCALE = AppLocale.EN
export const DEFAULT_LOCALE_STRING = AppLocaleString.EN

const getConfig = (locale: AppLocale): LocaleConfig =>
  APP_LOCALES[locale] ?? APP_LOCALES[DEFAULT_LOCALE]

export const getDateFnsLocale = (locale: AppLocale): DateFnsLocale => getConfig(locale).dateFns

export const getDayPickerLocale = (locale: AppLocale): DayPickerLocale =>
  getConfig(locale).dayPicker

export const getLocaleString = (locale: AppLocale): AppLocaleString =>
  getConfig(locale).localeString

/**
 * Язык для API Яндекс.Карт (формат lang=ru_RU, en_US)
 */
export const getYandexMapsLang = (locale: AppLocale): string =>
  getLocaleString(locale).replace('-', '_')
