import {
  groupForecastByDay,
  WeatherDetails,
  WeatherForecastList,
  WEATHER_LOCALES,
  type CurrentWeatherResponse,
  type WeatherLocale
} from '@/entities/weather'
import { useForecastQuery } from '../api/useForecastQuery'
import { WeatherForecastDialogSkeleton } from './WeatherForecastDialogSkeleton'
import type { GeoCoords } from '@/shared/lib/geo'

const MAX_DAYS = 5

interface WeatherForecastDialogContentProps {
  coords: GeoCoords
  locale: WeatherLocale
  currentWeather: CurrentWeatherResponse
  /**
   * Запрос за прогнозом погоды выполняется только когда true (например, если диалог открыт)
   */
  enabled?: boolean
}

export const WeatherForecastDialogContent = ({
  coords,
  locale,
  currentWeather,
  enabled = true
}: WeatherForecastDialogContentProps) => {
  const { data: forecast, isLoading, error } = useForecastQuery(coords, locale, { enabled })

  const weather = currentWeather.weather[0]

  if (!enabled) {
    return null
  }

  if (isLoading) {
    return <WeatherForecastDialogSkeleton />
  }

  if (error || !forecast?.list) {
    return (
      <p className='text-sm text-muted-foreground text-center py-4'>
        {WEATHER_LOCALES[locale].unavailable}
      </p>
    )
  }

  const dayForecasts = groupForecastByDay({
    list: forecast.list,
    maxDays: MAX_DAYS,
    locale
  })

  return (
    <>
      <WeatherForecastList
        dayForecasts={dayForecasts}
        currentWeather={{
          temperature: currentWeather.main.temp,
          description: weather.description,
          icon: weather.icon
        }}
        locale={locale}
      />

      <div className='pt-3 border-t border-border'>
        <WeatherDetails data={currentWeather} locale={locale} />
      </div>
    </>
  )
}
