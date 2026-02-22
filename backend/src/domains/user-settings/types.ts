import type { MEASUREMENT_UNITS, TIME_FORMATS } from './consts'

export type MeasurementUnit = (typeof MEASUREMENT_UNITS)[number]
export type TimeFormat = (typeof TIME_FORMATS)[number]
