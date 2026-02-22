import { lazy, Suspense, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { CurrentWeatherResponse } from '@/entities/weather'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/shared/ui'
import type { GeoCoords } from '@/shared/lib/geo'
import { WeatherForecastDialogSkeleton } from './WeatherForecastDialogSkeleton'

const WeatherForecastDialogContent = lazy(() => import('./WeatherForecastDialogContent'))

interface WeatherForecastDialogProps {
  trigger: ReactNode
  coords: GeoCoords
  currentWeather: CurrentWeatherResponse
}

export const WeatherForecastDialog = ({
  coords,
  currentWeather,
  trigger
}: WeatherForecastDialogProps) => {
  const [open, setOpen] = useState(false)

  const { t } = useTranslation()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className='sm:max-w-md'>
        <DialogTitle>{t('weather.today')}</DialogTitle>

        {open && (
          <Suspense fallback={<WeatherForecastDialogSkeleton />}>
            <WeatherForecastDialogContent coords={coords} currentWeather={currentWeather} />
          </Suspense>
        )}
      </DialogContent>
    </Dialog>
  )
}
