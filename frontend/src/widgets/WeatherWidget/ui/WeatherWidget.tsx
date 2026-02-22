import { useTranslation } from 'react-i18next'
import { useWeatherQuery, WeatherCurrentCard, getTemperatureUnit } from '@/entities/weather'
import { WeatherForecastDialog } from '@/features/weather/forecast'
import { useSettings } from '@/features/settings'
import { WeatherWidgetSkeleton } from './WeatherWidgetSkeleton'
import type { GeoCoords } from '@/shared/lib/geo'

interface WeatherWidgetProps {
  coords: GeoCoords
}

export const WeatherWidget = ({ coords }: WeatherWidgetProps) => {
  const { t } = useTranslation()
  const { getSetting } = useSettings()

  const locale = getSetting('locale')
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
        <p className='text-sm text-muted-foreground text-center'>{t('weather.unavailable')}</p>
      </div>
    )
  }

  const weather = data.weather[0]

  return (
    <WeatherForecastDialog
      coords={coords}
      currentWeather={data}
      trigger={
        <WeatherCurrentCard
          temperature={data.main.temp}
          feelsLike={data.main.feels_like}
          description={weather.description}
          icon={weather.icon}
          temperatureUnit={temperatureUnit}
        />
      }
    />
  )
}
