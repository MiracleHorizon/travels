import { useState, type ReactNode } from 'react'
import {
  WEATHER_LOCALES,
  type CurrentWeatherResponse,
  type WeatherLocale
} from '@/entities/weather'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/shared/ui'
import type { GeoCoords } from '@/shared/lib/geo'
import { WeatherForecastDialogContent } from './WeatherForecastDialogContent'

interface WeatherForecastDialogProps {
  coords: GeoCoords
  locale: WeatherLocale
  currentWeather: CurrentWeatherResponse
  trigger: ReactNode
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
        <WeatherForecastDialogContent
          coords={coords}
          locale={locale}
          currentWeather={currentWeather}
          enabled={open}
        />
      </DialogContent>
    </Dialog>
  )
}
