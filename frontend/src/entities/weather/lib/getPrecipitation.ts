import type { CurrentWeatherResponse } from '../model/types'

export const getPrecipitation = (data: CurrentWeatherResponse): number | undefined => {
  return data.rain?.['1h'] ?? data.rain?.['3h'] ?? data.snow?.['1h'] ?? data.snow?.['3h']
}
