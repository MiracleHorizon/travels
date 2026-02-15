import { capitalizeFirst } from '@/shared/lib/format'
import type { OpenWeatherResponse } from '../model/types'

interface WeatherCurrentProps {
  data: OpenWeatherResponse
}

export const WeatherCurrent = ({ data }: WeatherCurrentProps) => {
  const weather = data.weather[0]

  return (
    <div className='flex items-start gap-4'>
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt={weather.description}
        className='size-14 shrink-0'
      />
      <div className='min-w-0 flex-1'>
        <p className='text-2xl font-semibold tabular-nums'>{Math.round(data.main.temp)}°</p>
        <p className='text-sm text-muted-foreground wrap-break-word'>
          {capitalizeFirst(weather.description)}
        </p>
      </div>
    </div>
  )
}
