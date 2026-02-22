import { CloudRain, Cloud, Droplets, Gauge, Wind } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { getWindDirection } from '../lib/getWindDirection'
import { getPrecipitation } from '../lib/getPrecipitation'
import type { CurrentWeatherResponse } from '../model/types'

interface WeatherDetailsProps {
  // TODO: Оторвать от CurrentWeatherResponse
  data: CurrentWeatherResponse
}

export const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const { t } = useTranslation()
  const windDirections = t('weather.windDirections', {
    returnObjects: true
  }) as string[]

  const precipitation = getPrecipitation(data)
  const windDirection = getWindDirection(data.wind.deg, windDirections)

  return (
    <div className='flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground'>
      {precipitation != null && (
        <span className='flex items-center gap-1.5'>
          <CloudRain className='size-4 shrink-0' aria-hidden />
          {precipitation} {t('weather.precipitationUnit')}
        </span>
      )}

      <span className='flex items-center gap-1.5'>
        <Droplets className='size-4 shrink-0' aria-hidden />
        {data.main.humidity}%
      </span>

      <span className='flex items-center gap-1.5'>
        <Wind className='size-4 shrink-0' aria-hidden />
        {data.wind.speed} {t('weather.windSpeedUnit')}
        {windDirection && ` ${windDirection}`}
      </span>

      {data.main.pressure != null && (
        <span className='hidden @[260px]/weather-widget:inline-flex items-center gap-1.5'>
          <Gauge className='size-4 shrink-0' aria-hidden />
          {data.main.pressure} {t('weather.pressureUnit')}
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
