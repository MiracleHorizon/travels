import { ChevronRight } from 'lucide-react'
import { capitalizeFirst } from '@/shared/lib/format'
import type { WeatherLocale } from '../config/locales'
import { WEATHER_LOCALES } from '../config'
import { cn } from '@/shared/lib'
import { OPENWEATHER_ICON_URL } from '../lib/consts'

interface WeatherCurrentCardProps {
  temperature: number
  feelsLike: number | undefined
  description: string
  icon: string
  locale: WeatherLocale
  hasForecast: boolean
  onClick?: () => void
}

const gradient = 'bg-gradient-to-br from-sky-700/80 via-blue-700/75 to-indigo-700/80'
const hoverGradient = 'hover:to-indigo-700/60 hover:from-sky-700/70 hover:via-blue-600/75'
const hoverStyles = 'cursor-pointer transition-colors'

export const WeatherCurrentCard = ({
  temperature,
  description,
  icon,
  feelsLike,
  locale,
  hasForecast,
  onClick
}: WeatherCurrentCardProps) => {
  const { today, feelsLike: feelsLikeLabel, forecast } = WEATHER_LOCALES[locale]

  return (
    <div
      className={cn(
        'w-full rounded-2xl p-5 text-white shadow-lg min-h-[140px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-left',
        gradient,
        hasForecast && hoverStyles,
        hasForecast && hoverGradient
      )}
      onClick={onClick}
    >
      <div className='min-w-0 flex-1'>
        <p className='text-sm font-medium opacity-90'>{today}</p>
        <p className='text-4xl sm:text-5xl font-bold tabular-nums mt-1'>
          {Math.round(temperature)}°
        </p>

        <p className='text-sm font-medium mt-1'>{capitalizeFirst(description)}</p>
        {feelsLike !== undefined && (
          <p className='text-xs opacity-90 mt-0.5'>
            {feelsLikeLabel} {Math.round(feelsLike)}°
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
          src={`${OPENWEATHER_ICON_URL}/${icon}@4x.png`}
          alt={`${description} icon`}
          className='size-20 sm:size-24'
        />
      </div>
    </div>
  )
}
