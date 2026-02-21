import { lazy, Suspense, useState, type ReactNode } from 'react'
import {
  WEATHER_LOCALES,
  type CurrentWeatherResponse,
  type WeatherLocale
} from '@/entities/weather'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/shared/ui'
import type { GeoCoords } from '@/shared/lib/geo'
import { WeatherForecastDialogSkeleton } from './WeatherForecastDialogSkeleton'

const WeatherForecastDialogContent = lazy(() => import('./WeatherForecastDialogContent'))

interface WeatherForecastDialogProps {
  trigger: ReactNode
  coords: GeoCoords
  locale: WeatherLocale
  currentWeather: CurrentWeatherResponse
}

export const WeatherForecastDialog = ({
  coords,
  locale,
  currentWeather,
  trigger
}: WeatherForecastDialogProps) => {
  const [open, setOpen] = useState(false)
  const { today: todayLabel } = WEATHER_LOCALES[locale]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className='sm:max-w-md'>
        <DialogTitle>{todayLabel}</DialogTitle>

        {open && (
          <Suspense fallback={<WeatherForecastDialogSkeleton />}>
            <WeatherForecastDialogContent
              coords={coords}
              locale={locale}
              currentWeather={currentWeather}
            />
          </Suspense>
        )}
      </DialogContent>
    </Dialog>
  )
}
