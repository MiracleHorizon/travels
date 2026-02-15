import { useParams } from 'react-router-dom'

import { useTravelQuery } from '@/entities/travel'
import { Card, CardContent, Loader } from '@/shared/ui'
import { YANDEX_MAPS_API_KEY } from '@/shared/model/maps'

import { TravelMapView } from './TravelMapView'

export const TravelMapPage = () => {
  const { travelId } = useParams<{ travelId: string }>()
  const { data: travel, isLoading, error } = useTravelQuery(travelId)

  if (isLoading) {
    return (
      <Card className='h-full'>
        <Loader variant='fullsize' />
      </Card>
    )
  }

  if (error || !travel) {
    return (
      <div className='flex justify-center items-center min-h-[400px] text-muted-foreground'>
        Путешествие не найдено
      </div>
    )
  }

  if (!YANDEX_MAPS_API_KEY && import.meta.env.DEV) {
    return (
      <Card className='h-full'>
        <CardContent className='h-full p-0 text-center gap-3 flex flex-col items-center justify-center'>
          <p className='font-medium text-2xl'>Карта недоступна</p>
          <p className='text-sm mt-1 text-muted-foreground'>
            Добавьте <code>VITE_YANDEX_MAPS_API_KEY</code> в <code>.env</code> для отображения карты
          </p>
        </CardContent>
      </Card>
    )
  }

  return <TravelMapView travel={travel} />
}
