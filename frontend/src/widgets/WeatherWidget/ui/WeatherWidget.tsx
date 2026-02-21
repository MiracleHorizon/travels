import {
  DEFAULT_WEATHER_LOCALE,
  groupForecastByDay,
  useForecastQuery,
  useWeatherQuery,
  WeatherDetails,
  WeatherCurrentCard,
  WeatherForecastList,
  WEATHER_LOCALES
} from '@/entities/weather'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/shared/ui'
import type { GeoCoords } from '@/shared/lib/geo'
import type { WeatherLocale } from '@/entities/weather'
import { WeatherWidgetSkeleton } from './WeatherWidgetSkeleton'

interface WeatherWidgetProps {
  coords: GeoCoords
  locale?: WeatherLocale
}

const MAX_DAYS = 6

export const WeatherWidget = ({ coords, locale = DEFAULT_WEATHER_LOCALE }: WeatherWidgetProps) => {
  const { data, isLoading, error } = useWeatherQuery(coords, locale)
  const { data: forecast } = useForecastQuery(coords, locale)

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

  const dayForecasts = groupForecastByDay({
    list: forecast?.list,
    maxDays: MAX_DAYS,
    locale
  })
  const weather = data.weather[0]

  const { today: todayLabel } = WEATHER_LOCALES[locale]

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <WeatherCurrentCard
            temperature={data.main.temp}
            feelsLike={data.main.feels_like}
            description={weather.description}
            icon={weather.icon}
            locale={locale}
            hasForecast={dayForecasts.length > 0}
          />
        </DialogTrigger>

        <DialogContent className='sm:max-w-md'>
          <DialogTitle className='sr-only'>{todayLabel}</DialogTitle>

          <WeatherForecastList
            dayForecasts={dayForecasts}
            currentWeather={{
              temperature: data.main.temp,
              description: weather.description,
              icon: weather.icon
            }}
            locale={locale}
          />

          <div className='pt-3 border-t border-border'>
            <WeatherDetails data={data} locale={locale} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
