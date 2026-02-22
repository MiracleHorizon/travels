import type { MeasurementUnit, TimeFormat, Locale } from './types'

interface SettingsOption<T extends string> {
  value: T
  label: string
}

export const MEASUREMENT_OPTIONS: SettingsOption<MeasurementUnit>[] = [
  {
    value: 'metric',
    label: 'Метрические'
  },
  {
    value: 'imperial',
    label: 'Имперские'
  }
] as const

export const TIME_FORMAT_OPTIONS: SettingsOption<TimeFormat>[] = [
  {
    value: '24h',
    label: '24 часа'
  },
  {
    value: '12h',
    label: '12 часов'
  }
] as const

export const LOCALE_OPTIONS: SettingsOption<Locale>[] = [
  { value: 'ru', label: 'Русский' },
  { value: 'en', label: 'English' }
] as const
