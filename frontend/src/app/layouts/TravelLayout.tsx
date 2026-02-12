import {
  TravelCover,
  TravelEmptyPlaceholder,
  TravelGallery,
  useTravelQuery
} from '@/entities/travel'
import { Button, Spinner, Tabs, TabsList, TabsTrigger, TooltipComposer } from '@/shared/ui'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { MapPin, Upload } from 'lucide-react'
import { useUploadTravelPhotoAction } from '@/features/travel/upload-photo'

import AutoplayPlugin from 'embla-carousel-autoplay'
import FadePlugin from 'embla-carousel-fade'

export const TravelLayout = () => {
  const { travelId } = useParams<{ travelId: string }>()
  const { data: travel, isLoading, error } = useTravelQuery(travelId)
  const { uploadTravelPhoto } = useUploadTravelPhotoAction()

  const navigate = useNavigate()
  const location = useLocation()
  const currentTab = location.pathname.endsWith('/diary') ? 'diary' : 'main'

  const navigateTab = (tab: string) => {
    if (tab === 'main') {
      navigate(`/travels/${travelId}`)
    } else {
      navigate(`/travels/${travelId}/${tab}`)
    }
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-full'>
        <Spinner className='h-12 w-12' />
      </div>
    )
  }

  if (error || !travel) {
    return <TravelEmptyPlaceholder />
  }

  return (
    <div className='flex flex-col gap-4'>
      <TravelCover
        name={travel.name}
        startDate={travel.start_date}
        endDate={travel.end_date}
        isPast={travel.status === 'past'}
        renderGallery={() => (
          <TravelGallery
            images={travel.photos.map(photo => photo.url)}
            travelName={travel.name}
            plugins={[
              AutoplayPlugin({
                delay: 6000,
                active: true,
                stopOnFocusIn: false,
                stopOnLastSnap: false,
                stopOnInteraction: false
              }),
              FadePlugin()
            ]}
          />
        )}
      />

      <Tabs value={currentTab} onValueChange={navigateTab}>
        <TabsList variant='line' className='w-full mb-2'>
          <div>
            <TabsTrigger value='main'>Основное</TabsTrigger>
            <TabsTrigger value='diary'>Дневник</TabsTrigger>
          </div>

          <div className='flex gap-1 ml-auto'>
            <Button variant='secondary' size='sm'>
              <MapPin className='size-5' aria-hidden={true} />
              Показать на карте
            </Button>

            <TooltipComposer content='Загрузить фотографию'>
              <Button
                variant='secondary'
                size='icon-sm'
                onClick={() => uploadTravelPhoto(travelId)}
              >
                <Upload className='size-5' aria-hidden={true} />
              </Button>
            </TooltipComposer>
          </div>
        </TabsList>

        <Outlet />
      </Tabs>
    </div>
  )
}
