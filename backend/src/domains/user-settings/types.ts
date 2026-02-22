import type { MEASUREMENT_UNITS, TIME_FORMATS, LOCALES } from './consts'

export type MeasurementUnit = (typeof MEASUREMENT_UNITS)[number]
export type TimeFormat = (typeof TIME_FORMATS)[number]
export type Locale = (typeof LOCALES)[number]
