import { useTranslation } from 'react-i18next'
import {
  groupForecastByDay,
  getTemperatureUnit,
  WeatherDetails,
  WeatherForecastList,
  type CurrentWeatherResponse
} from '@/entities/weather'
import { useSettings } from '@/features/settings'
import { useForecastSuspenseQuery } from '../api/useForecastSuspenseQuery'
import type { GeoCoords } from '@/shared/lib/geo'

const MAX_DAYS = 5

interface WeatherForecastDialogContentProps {
  coords: GeoCoords
  // TODO: Оторвать от CurrentWeatherResponse
  currentWeather: CurrentWeatherResponse
}

const WeatherForecastDialogContent = ({
  coords,
  currentWeather
}: WeatherForecastDialogContentProps) => {
  const { t } = useTranslation()
  const { getSetting } = useSettings()

  const locale = getSetting('locale')
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
      <p className='text-sm text-muted-foreground text-center py-4'>{t('weather.unavailable')}</p>
    )
  }

  const dayForecasts = groupForecastByDay({
    list: forecast.list,
    maxDays: MAX_DAYS,
    locale,
    todayLabel: t('weather.today')
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
        temperatureUnit={temperatureUnit}
      />

      <div className='pt-3 border-t border-border'>
        <WeatherDetails data={currentWeather} />
      </div>
    </>
  )
}

/**
 * Экспорт по умолчанию для удобного использования с lazy
 */
export default WeatherForecastDialogContent
