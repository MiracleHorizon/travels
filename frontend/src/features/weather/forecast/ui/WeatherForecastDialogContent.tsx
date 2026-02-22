import {
  groupForecastByDay,
  getTemperatureUnit,
  WeatherDetails,
  WeatherForecastList,
  WEATHER_LOCALES,
  type CurrentWeatherResponse,
  type WeatherLocale
} from '@/entities/weather'
import { useSettings } from '@/features/settings'
import { useForecastSuspenseQuery } from '../api/useForecastSuspenseQuery'
import type { GeoCoords } from '@/shared/lib/geo'

const MAX_DAYS = 5

interface WeatherForecastDialogContentProps {
  coords: GeoCoords
  locale: WeatherLocale
  currentWeather: CurrentWeatherResponse
}

const WeatherForecastDialogContent = ({
  coords,
  locale,
  currentWeather
}: WeatherForecastDialogContentProps) => {
  const { getSetting } = useSettings()

  const units = getSetting('measurementUnit')
  const temperatureUnit = getTemperatureUnit(units)

  const { data: forecast, error } = useForecastSuspenseQuery({
    coords,
    locale,
    units
  })

  const weather = currentWeather.weather[0]

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
        temperatureUnit={temperatureUnit}
      />

      <div className='pt-3 border-t border-border'>
        <WeatherDetails data={currentWeather} locale={locale} />
      </div>
    </>
  )
}

/**
 * Экспорт по умолчанию для удобного использования с lazy
 */
export default WeatherForecastDialogContent
