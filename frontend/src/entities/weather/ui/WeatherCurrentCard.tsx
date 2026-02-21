import { ChevronRight } from 'lucide-react'
import { capitalizeFirst } from '@/shared/lib/format'
import type { OpenWeatherResponse } from '../model/types'
import type { WeatherLocale } from '../config/locales'
import { WEATHER_LOCALES } from '../config'

interface WeatherCurrentCardProps {
  data: OpenWeatherResponse
  locale: WeatherLocale
  hasForecast: boolean
  onClick: () => void
}

const gradient = 'bg-gradient-to-br from-sky-700/80 via-blue-700/75 to-indigo-700/80'

export const WeatherCurrentCard = ({
  data,
  locale,
  hasForecast,
  onClick
}: WeatherCurrentCardProps) => {
  const weather = data.weather[0]
  const { today, feelsLike, forecast } = WEATHER_LOCALES[locale]

  return (
    <div
      onClick={onClick}
      className={`${gradient} w-full rounded-2xl p-5 text-white shadow-lg min-h-[140px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-left cursor-pointer transition-colors hover:to-indigo-700/60 hover:from-sky-700/70 hover:via-blue-600/75 active:opacity-90`}
    >
      <div className='min-w-0 flex-1'>
        <p className='text-sm font-medium opacity-90'>{today}</p>
        <p className='text-4xl sm:text-5xl font-bold tabular-nums mt-1'>
          {Math.round(data.main.temp)}°
        </p>

        <p className='text-sm font-medium mt-1'>{capitalizeFirst(weather.description)}</p>
        {data.main.feels_like != null && (
          <p className='text-xs opacity-90 mt-0.5'>
            {feelsLike} {Math.round(data.main.feels_like)}°
          </p>
        )}
      </div>

      <div className='flex flex-col items-end shrink-0 gap-1'>
        {hasForecast && (
          <span className='text-xs opacity-80 font-medium flex items-center gap-0.5'>
            {forecast}
            <ChevronRight className='size-3.5 mt-0.5' />
          </span>
        )}

        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
          alt={weather.description}
          className='size-20 sm:size-24'
        />
      </div>
    </div>
  )
}
