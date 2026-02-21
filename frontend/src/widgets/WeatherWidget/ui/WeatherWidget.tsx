import { useState } from 'react'
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
import { Dialog, DialogContent, DialogTitle, Spinner } from '@/shared/ui'
import type { GeoCoords } from '@/shared/lib/geo'
import type { WeatherLocale } from '@/entities/weather'

interface WeatherWidgetProps {
  coords: GeoCoords
  locale?: WeatherLocale
}

const MAX_DAYS = 6

export const WeatherWidget = ({ coords, locale = DEFAULT_WEATHER_LOCALE }: WeatherWidgetProps) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const { data, isLoading, error } = useWeatherQuery(coords, locale)
  const { data: forecast } = useForecastQuery(coords, locale)

  if (isLoading) {
    return (
      <div className='rounded-2xl border border-border bg-card/80 p-8 flex justify-center items-center min-h-[140px]'>
        <Spinner className='h-8 w-8' />
      </div>
    )
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

  const dayForecasts = groupForecastByDay(forecast.list, MAX_DAYS, locale)
  const weather = data.weather[0]
  const { today } = WEATHER_LOCALES[locale]

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <WeatherCurrentCard
          data={data}
          locale={locale}
          hasForecast={dayForecasts.length > 0}
          onClick={() => setDialogOpen(true)}
        />

        <DialogContent className='sm:max-w-md'>
          <DialogTitle className='sr-only'>{today}</DialogTitle>

          <WeatherForecastList
            dayForecasts={dayForecasts}
            currentData={{
              temp: data.main.temp,
              icon: weather.icon,
              description: weather.description
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
