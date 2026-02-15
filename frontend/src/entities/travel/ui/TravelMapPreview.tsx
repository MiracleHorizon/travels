import { Link } from 'react-router-dom'
import { Map } from 'lucide-react'

import { useTheme } from '@/entities/theme'
import { Button, Card } from '@/shared/ui'

import mapPreviewLightPng from '@/shared/assets/map-preview/map_preview_light.png'
import mapPreviewDarkPng from '@/shared/assets/map-preview/map_preview_dark.png'

interface TravelMapPreviewProps {
  travelId: string
}

export const TravelMapPreview = ({ travelId }: TravelMapPreviewProps) => {
  const { realTheme } = useTheme()

  return (
    <Card className='relative overflow-hidden p-0'>
      <img
        src={realTheme === 'light' ? mapPreviewLightPng : mapPreviewDarkPng}
        className='w-full aspect-2/1 object-cover block'
        alt='Карта'
      />

      <Link
        to={`/travels/${travelId}/map`}
        className='absolute left-[50%] translate-x-[-50%] bottom-[50%] translate-y-[50%]'
      >
        <Button size='sm'>
          <Map />
          Посмотреть на карте
        </Button>
      </Link>
    </Card>
  )
}
