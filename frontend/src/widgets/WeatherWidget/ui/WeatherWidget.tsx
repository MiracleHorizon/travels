import {
  DEFAULT_WEATHER_LOCALE,
  useWeatherQuery,
  WeatherCurrentCard,
  WEATHER_LOCALES,
  getTemperatureUnit
} from '@/entities/weather'
import { WeatherForecastDialog } from '@/features/weather/forecast'
import { useSettings } from '@/features/settings'
import { WeatherWidgetSkeleton } from './WeatherWidgetSkeleton'
import type { GeoCoords } from '@/shared/lib/geo'
import type { WeatherLocale } from '@/entities/weather'

interface WeatherWidgetProps {
  coords: GeoCoords
  locale?: WeatherLocale
}

export const WeatherWidget = ({ coords, locale = DEFAULT_WEATHER_LOCALE }: WeatherWidgetProps) => {
  const { getSetting } = useSettings()

  const units = getSetting('measurementUnit')
  const temperatureUnit = getTemperatureUnit(units)

  const { data, isLoading, error } = useWeatherQuery({
    coords,
    locale,
    units
  })

  if (isLoading) {
    return <WeatherWidgetSkeleton />
  }

  if (error || !data) {
    return (
      <div className='rounded-2xl border border-border bg-card/80 p-4'>
        <p className='text-sm text-muted-foreground text-center'>
          {WEATHER_LOCALES[locale].unavailable}
        </p>
      </div>
    )
  }

  const weather = data.weather[0]

  return (
    <WeatherForecastDialog
      coords={coords}
      locale={locale}
      currentWeather={data}
      trigger={
        <WeatherCurrentCard
          temperature={data.main.temp}
          feelsLike={data.main.feels_like}
          description={weather.description}
          icon={weather.icon}
          locale={locale}
          temperatureUnit={temperatureUnit}
          hasForecast
        />
      }
    />
  )
}
