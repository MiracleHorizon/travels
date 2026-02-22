export type MeasurementUnit = 'metric' | 'imperial'

export type TimeFormat = '24h' | '12h'

export interface UserSettings {
  measurementUnit: MeasurementUnit
  timeFormat: TimeFormat
}
