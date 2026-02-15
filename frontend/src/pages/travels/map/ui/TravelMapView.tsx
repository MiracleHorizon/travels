import { useTheme } from '@/entities/theme'
import { Card, CardContent, Loader } from '@/shared/ui'
import { YMap, useMapInitialLocation } from '@/shared/model/maps'
import { MapPinMarker } from '@/shared/ui'

import type { TravelDetailed } from '@/entities/travel'

interface TravelMapViewProps {
  travel: TravelDetailed
}

export const TravelMapView = ({ travel }: TravelMapViewProps) => {
  const { realTheme } = useTheme()
  const location = useMapInitialLocation({
    coords: travel.coords
  })

  if (location.status !== 'ready') {
    return (
      <Card className='h-full'>
        <Loader variant='fullsize' />
      </Card>
    )
  }

  return (
    <Card className='p-0 h-full rounded-t-2xl overflow-hidden'>
      <CardContent className='relative p-0 h-full'>
        <div className='absolute inset-0'>
          <YMap
            theme={realTheme}
            initialLocation={location.coords}
            point={location.coords}
            pointPin={<MapPinMarker className='text-red-400' />}
          />
        </div>
      </CardContent>
    </Card>
  )
}
