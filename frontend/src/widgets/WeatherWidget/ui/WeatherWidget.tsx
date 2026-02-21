import {
  DEFAULT_WEATHER_LOCALE,
  groupForecastByDay,
  useForecastQuery,
  useWeatherQuery,
  WeatherCurrent,
  WeatherDetails,
  WeatherForecastDay,
  WEATHER_LOCALES
} from '@/entities/weather'
import { Card, CardContent, Spinner } from '@/shared/ui'
import type { GeoCoords } from '@/shared/lib/geo'
import type { WeatherLocale } from '@/entities/weather'

interface WeatherWidgetProps {
  coords: GeoCoords
  locale?: WeatherLocale
}

const MAX_DAYS = 5

export const WeatherWidget = ({ coords, locale = DEFAULT_WEATHER_LOCALE }: WeatherWidgetProps) => {
  const { data, isLoading, error } = useWeatherQuery(coords, locale)
  const { data: forecast } = useForecastQuery(coords, locale)

  if (isLoading) {
    return (
      <Card>
        <CardContent className='flex justify-center items-center py-8'>
          <Spinner className='h-8 w-8' />
        </CardContent>
      </Card>
    )
  }

  if (error || !data) {
    return (
      <Card>
        <CardContent className='py-4'>
          <p className='text-sm text-muted-foreground text-center'>
            {WEATHER_LOCALES[locale].unavailable}
          </p>
        </CardContent>
      </Card>
    )
  }

  const dayForecasts = forecast?.list ? groupForecastByDay(forecast.list, MAX_DAYS, locale) : []

  return (
    <Card className='@container/weather-widget'>
      <CardContent>
        <WeatherCurrent data={data} />
        <div className='mt-4'>
          <WeatherDetails data={data} locale={locale} />
        </div>
        {dayForecasts.length > 0 && (
          <div
            className={`mt-4 flex flex-col gap-2 @[300px]/weather-widget:grid @[300px]/weather-widget:grid-cols-${MAX_DAYS}`}
          >
            {dayForecasts.map(day => (
              <WeatherForecastDay key={day.date} day={day} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
