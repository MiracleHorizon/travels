import { lazy, Suspense, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import {
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
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className='sm:max-w-md'>
        <DialogTitle>{t('weather.today')}</DialogTitle>

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
