import { useTranslation } from 'react-i18next'
import { capitalizeFirst } from '@/shared/lib/format'
import { Item, ItemMedia, ItemTitle } from '@/shared/ui'
import type { DayForecast } from '../model/types'
import type { TemperatureUnit } from '../config/locales'
import { OPENWEATHER_ICON_URL } from '../lib/consts'

interface WeatherForecastListProps {
  dayForecasts: DayForecast[]
  currentWeather: {
    temperature: number
    description: string
    icon: string
  }
  temperatureUnit?: TemperatureUnit
}

export const WeatherForecastList = ({
  dayForecasts,
  currentWeather,
  temperatureUnit = '°C'
}: WeatherForecastListProps) => {
  const { t } = useTranslation()
  const forecastLabel = t('weather.forecast')

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-3 pb-3 border-b border-border'>
        <img
          src={`${OPENWEATHER_ICON_URL}/${currentWeather.icon}@2x.png`}
          alt={`${currentWeather.description} icon`}
          className='size-12'
        />
        <div>
          <p className='text-3xl font-bold tabular-nums'>
            {Math.round(currentWeather.temperature)}
            {temperatureUnit}
          </p>
          <p className='text-sm text-muted-foreground'>
            {capitalizeFirst(currentWeather.description)}
          </p>
        </div>
      </div>

      <div>
        <h3 className='text-sm font-medium text-muted-foreground mb-3'>{forecastLabel}</h3>

        <div className='space-y-2'>
          {dayForecasts.map(day => (
            <Item key={day.date} variant='muted' size='sm' className='justify-between h-12 py-0'>
              <ItemTitle className='min-w-16 capitalize'>{day.weekday}</ItemTitle>
              <ItemMedia variant='image'>
                <img
                  src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                  alt={`${day.weekday} icon`}
                  className='size-8'
                />
              </ItemMedia>

              <span className='text-sm font-semibold tabular-nums'>
                {Math.round(day.minTemperature)} / {Math.round(day.maxTemperature)}
                {temperatureUnit}
              </span>
            </Item>
          ))}
        </div>
      </div>
    </div>
  )
}
