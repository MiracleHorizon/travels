import { capitalizeFirst } from '@/shared/lib/format'
import type { DayForecast } from '../model/types'
import { WEATHER_LOCALES, type WeatherLocale, type TemperatureUnit } from '../config/locales'
import { OPENWEATHER_ICON_URL } from '../lib/consts'

interface WeatherForecastListProps {
  dayForecasts: DayForecast[]
  currentWeather: {
    temperature: number
    description: string
    icon: string
  }
  locale: WeatherLocale
  temperatureUnit?: TemperatureUnit
}

export const WeatherForecastList = ({
  dayForecasts,
  currentWeather,
  locale,
  temperatureUnit = '°C'
}: WeatherForecastListProps) => {
  const { forecast } = WEATHER_LOCALES[locale]

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
        <h3 className='text-sm font-medium text-muted-foreground mb-3'>{forecast}</h3>

        <div className='space-y-2'>
          {dayForecasts.map(day => (
            <div
              key={day.date}
              className='flex items-center justify-between gap-4 rounded-lg bg-muted/50 px-3 py-2'
            >
              <span className='text-sm font-medium min-w-16'>{day.weekday}</span>

              <img
                src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                alt={`${day.weekday} icon`}
                className='size-8'
              />

              <span className='text-sm font-semibold tabular-nums'>
                {Math.round(day.minTemperature)} / {Math.round(day.maxTemperature)}
                {temperatureUnit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
