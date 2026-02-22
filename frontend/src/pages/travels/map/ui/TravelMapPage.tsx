import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { useTravelQuery } from '@/entities/travel'
import { TravelMap } from '@/widgets/TravelMap'
import { Card, CardContent, Loader } from '@/shared/ui'
import { YANDEX_MAPS_API_KEY } from '@/shared/model/maps'

export const TravelMapPage = () => {
  const { t } = useTranslation()
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
        {t('travelPage.notFound')}
      </div>
    )
  }

  if (!YANDEX_MAPS_API_KEY && import.meta.env.DEV) {
    return (
      <Card className='h-full'>
        <CardContent className='h-full p-0 text-center gap-3 flex flex-col items-center justify-center'>
          <p className='font-medium text-2xl'>{t('travelPage.mapUnavailable')}</p>
          <p className='text-sm mt-1 text-muted-foreground'>
            {t('travelPage.mapUnavailableHint', { key: 'VITE_YANDEX_MAPS_API_KEY' })}
          </p>
        </CardContent>
      </Card>
    )
  }

  return <TravelMap coords={travel.coords} />
}
