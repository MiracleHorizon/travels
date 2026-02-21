import type { OpenWeatherResponse } from '../model/types'

export const getPrecipitation = (data: OpenWeatherResponse): number | undefined => {
  return data.rain?.['1h'] ?? data.rain?.['3h'] ?? data.snow?.['1h'] ?? data.snow?.['3h']
}
