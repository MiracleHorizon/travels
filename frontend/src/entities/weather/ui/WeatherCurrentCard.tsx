import { ChevronRight } from 'lucide-react'
import { capitalizeFirst } from '@/shared/lib/format'
import type { WeatherLocale } from '../config/locales'
import { WEATHER_LOCALES } from '../config'
import { cn } from '@/shared/lib'
import { OPENWEATHER_ICON_URL } from '../lib/consts'
import type { Ref } from 'react'

interface WeatherCurrentCardProps {
  temperature: number
  feelsLike: number | undefined
  description: string
  icon: string
  locale: WeatherLocale
  hasForecast: boolean
  ref?: Ref<HTMLDivElement>
  onClick?: () => void
}

const gradient =
  'bg-gradient-to-br from-sky-700/80 via-blue-700/75 to-indigo-700/80 hover:from-cyan-600/90 hover:via-blue-600/85 hover:to-violet-700/90'

export const WeatherCurrentCard = ({
  temperature,
  description,
  icon,
  feelsLike,
  locale,
  onClick,
  ref,
  ...rest
}: WeatherCurrentCardProps) => {
  const {
    today: todayLabel,
    feelsLike: feelsLikeLabel,
    forecast: forecastLabel
  } = WEATHER_LOCALES[locale]

  return (
    <div
      ref={ref}
      className={cn(
        'w-full rounded-2xl text-white shadow-lg text-left',
        'p-4 min-h-0 sm:p-5 sm:min-h-[140px]',
        'flex flex-row items-center gap-3 sm:gap-4 sm:justify-between cursor-pointer transition-colors duration-300',
        gradient
      )}
      onClick={onClick}
      {...rest}
    >
      <div className='min-w-0 flex-1 flex flex-col gap-0.5 sm:gap-1'>
        <p className='text-xs sm:text-sm font-medium opacity-90'>{todayLabel}</p>

        <div className='flex items-center gap-2'>
          <p className='text-3xl sm:text-5xl font-bold tabular-nums leading-none'>
            {Math.round(temperature)}°
          </p>
          <img
            src={`${OPENWEATHER_ICON_URL}/${icon}@4x.png`}
            alt=''
            className='size-12 shrink-0 sm:hidden'
            aria-hidden
          />
        </div>

        <p className='text-xs sm:text-sm font-medium truncate' title={description}>
          {capitalizeFirst(description)}
        </p>

        <div className='flex items-center gap-2 flex-wrap'>
          {feelsLike !== undefined && (
            <span className='text-xs opacity-90'>
              {feelsLikeLabel} {Math.round(feelsLike)}°
            </span>
          )}
        </div>
      </div>

      <div className='hidden sm:flex flex-col items-end shrink-0 gap-1'>
        {/* TODO: А почему сущность знает про какой-то там "прогноз"? */}
        <span className='text-xs opacity-80 font-medium flex items-center gap-0.5'>
          {forecastLabel}
          <ChevronRight className='size-3.5 mt-0.5' />
        </span>

        <img
          src={`${OPENWEATHER_ICON_URL}/${icon}@4x.png`}
          alt={`${description} icon`}
          className='size-20 sm:size-24'
          aria-hidden
        />
      </div>
    </div>
  )
}
