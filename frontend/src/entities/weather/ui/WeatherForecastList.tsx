import { capitalizeFirst } from '@/shared/lib/format'
import type { DayForecast } from '../model/types'
import type { WeatherLocale } from '../config/locales'
import { WEATHER_LOCALES } from '../config'

interface WeatherForecastListProps {
  dayForecasts: DayForecast[]
  currentData: {
    temp: number
    icon: string
    description: string
  }
  locale: WeatherLocale
}

export const WeatherForecastList = ({
  dayForecasts,
  currentData,
  locale
}: WeatherForecastListProps) => {
  const { forecast } = WEATHER_LOCALES[locale]

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-3 pb-3 border-b border-border'>
        <img
          src={`https://openweathermap.org/img/wn/${currentData.icon}@2x.png`}
          alt={currentData.description}
          className='size-12'
        />
        <div>
          <p className='text-3xl font-bold tabular-nums'>{Math.round(currentData.temp)}°</p>
          <p className='text-sm text-muted-foreground'>
            {capitalizeFirst(currentData.description)}
          </p>
        </div>
      </div>

      <div>
        <h3 className='text-sm font-medium text-muted-foreground mb-3'>{forecast}</h3>

        <div className='space-y-2'>
          {dayForecasts.map(day => (
            <div
              key={day.date}
              className='flex items-center justify-between gap-4 rounded-lg bg-muted/50 px-3 py-2'
            >
              <span className='text-sm font-medium min-w-16'>{day.dayName}</span>
              <img
                src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                alt={day.description}
                className='size-8'
              />
              <span className='text-sm font-semibold tabular-nums'>
                {Math.round(day.tempMin)}° / {Math.round(day.tempMax)}°
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
