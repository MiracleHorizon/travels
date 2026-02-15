import type { DayForecast } from '../model/types'

interface WeatherForecastDayProps {
  day: DayForecast
}

export const WeatherForecastDay = ({ day }: WeatherForecastDayProps) => (
  <div className='flex flex-row items-center justify-between gap-3 rounded-lg bg-muted/50 px-3 py-2 @[300px]/weather-widget:flex-col @[300px]/weather-widget:items-center @[300px]/weather-widget:justify-center @[300px]/weather-widget:gap-1 @[300px]/weather-widget:px-2'>
    <span className='text-xs text-muted-foreground shrink-0 min-w-16 @[300px]/weather-widget:min-w-0'>
      {day.dayName}
    </span>
    <div className='flex items-center gap-2 shrink-0 @[300px]/weather-widget:flex-col @[300px]/weather-widget:gap-1'>
      <img
        src={`https://openweathermap.org/img/wn/${day.icon}.png`}
        alt={day.description}
        className='size-8'
      />
      <span className='text-sm font-medium tabular-nums'>{Math.round(day.temp)}°</span>
    </div>
    <span className='text-[10px] text-muted-foreground shrink-0 min-w-8 text-right @[300px]/weather-widget:min-w-0 @[300px]/weather-widget:text-center'>
      {day.pop > 0 ? `${Math.round(day.pop * 100)}%` : '—'}
    </span>
  </div>
)
