import { ru as ruDateFns, enUS } from 'date-fns/locale'
import type { Locale as DateFnsLocale } from 'date-fns'
import { ru as ruDayPicker, enUS as enUSDayPicker } from 'react-day-picker/locale'
import type { Locale as DayPickerLocale } from 'react-day-picker'

export type AppLocale = 'ru' | 'en'

const DATE_FNS_LOCALES: Record<AppLocale, DateFnsLocale> = {
  ru: ruDateFns,
  en: enUS
}

const DAY_PICKER_LOCALES: Record<AppLocale, DayPickerLocale> = {
  ru: ruDayPicker,
  en: enUSDayPicker
}

export const getDateFnsLocale = (locale: AppLocale): DateFnsLocale =>
  DATE_FNS_LOCALES[locale] ?? DATE_FNS_LOCALES.ru

export const getDayPickerLocale = (locale: AppLocale): DayPickerLocale =>
  DAY_PICKER_LOCALES[locale] ?? DAY_PICKER_LOCALES.ru

export const getLocaleString = (locale: AppLocale): string =>
  locale === 'en' ? 'en-US' : 'ru-RU'
