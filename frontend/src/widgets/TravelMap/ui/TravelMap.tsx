import { useTheme } from '@/entities/theme'
import { Card, CardContent, Loader } from '@/shared/ui'
import { YMap } from '@/shared/model/maps'
import { MapPinMarker } from '@/shared/ui'
import { GeoCoords } from '@/shared/lib/geo'
import { useMapInitialLocation } from '../model/useMapInitialLocation'

interface TravelMapProps {
  coords: GeoCoords | undefined
}

export const TravelMap = ({ coords }: TravelMapProps) => {
  const { realTheme } = useTheme()
  const location = useMapInitialLocation({ coords })

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
            pointPin={<MapPinMarker />}
          />
        </div>
      </CardContent>
    </Card>
  )
}
