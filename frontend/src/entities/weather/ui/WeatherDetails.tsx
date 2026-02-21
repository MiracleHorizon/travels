import { CloudRain, Cloud, Droplets, Gauge, Wind } from 'lucide-react'

import { getWindDirection } from '../lib/getWindDirection'
import { getPrecipitation } from '../lib/getPrecipitation'
import type { CurrentWeatherResponse } from '../model/types'
import type { WeatherLocale } from '../config/locales'

interface WeatherDetailsProps {
  // TODO: Оторвать от CurrentWeatherResponse
  data: CurrentWeatherResponse
  locale?: WeatherLocale
}

export const WeatherDetails = ({ data, locale = 'ru' }: WeatherDetailsProps) => {
  const precipitation = getPrecipitation(data)
  const windDirection = getWindDirection(data.wind.deg, locale)

  return (
    <div className='flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground'>
      {precipitation != null && (
        <span className='flex items-center gap-1.5'>
          <CloudRain className='size-4 shrink-0' aria-hidden />
          {precipitation} мм/ч
        </span>
      )}

      <span className='flex items-center gap-1.5'>
        <Droplets className='size-4 shrink-0' aria-hidden />
        {data.main.humidity}%
      </span>

      <span className='flex items-center gap-1.5'>
        <Wind className='size-4 shrink-0' aria-hidden />
        {data.wind.speed} м/с
        {windDirection && ` ${windDirection}`}
      </span>

      {data.main.pressure != null && (
        <span className='hidden @[260px]/weather-widget:inline-flex items-center gap-1.5'>
          <Gauge className='size-4 shrink-0' aria-hidden />
          {data.main.pressure} гПа
        </span>
      )}

      {data.clouds?.all != null && (
        <span className='hidden @[320px]/weather-widget:inline-flex items-center gap-1.5'>
          <Cloud className='size-4 shrink-0' aria-hidden />
          {data.clouds.all}%
        </span>
      )}
    </div>
  )
}
