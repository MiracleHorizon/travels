import { useParams } from 'react-router-dom'
import { MapPin, Upload } from 'lucide-react'

import AutoplayPlugin from 'embla-carousel-autoplay'
import FadePlugin from 'embla-carousel-fade'

import { useTravelQuery, TravelCover, TravelGallery } from '@/entities/travel'
import { Spinner, Badge, Card, CardContent, CardTitle, Button } from '@/shared/ui'
import { ExpensesList } from '@/widgets/ExpensesList'
import { TravelChecklist } from '@/widgets/TravelChecklist'
import { TravelDetailPageEmpty } from './TravelDetailPageEmpty'
import { useUploadTravelPhotoAction } from '@/features/travel/upload-photo'

export const TravelDetailPage = () => {
  const { travelId } = useParams<{ travelId: string }>()
  const { data: travel, isLoading, error } = useTravelQuery(travelId)
  const { uploadTravelPhoto } = useUploadTravelPhotoAction()

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-full'>
        <Spinner className='h-12 w-12' />
      </div>
    )
  }

  if (error || !travel) {
    return <TravelDetailPageEmpty />
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

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        <div className='lg:col-span-2 space-y-4'>
          {travel.description && (
            <Card>
              <CardContent>
                <CardTitle className='text-xl font-semibold mb-4'>Описание</CardTitle>
                <p className='text-muted-foreground leading-relaxed whitespace-pre-wrap'>
                  {travel.description}
                </p>
              </CardContent>
            </Card>
          )}

          <ExpensesList travelId={travel.id} />
        </div>

        <div className='space-y-4'>
          <Card>
            <CardContent>
              <CardTitle className='text-lg font-semibold mb-4'>Действия</CardTitle>
              <div className='flex flex-col gap-3'>
                <Button variant='secondary' size='sm'>
                  <MapPin className='h-5 w-5' aria-hidden={true} />
                  Показать на карте
                </Button>

                <Button size='sm' onClick={() => uploadTravelPhoto(travelId)}>
                  <Upload className='h-5 w-5' aria-hidden={true} />
                  Загрузить фотографию
                </Button>
              </div>
            </CardContent>
          </Card>

          <TravelChecklist travelId={travel.id} />

          {Boolean(travel.tags.length) && (
            <Card>
              <CardContent>
                <CardTitle className='text-lg font-semibold mb-4'>Теги</CardTitle>
                <div className='flex flex-wrap gap-2'>
                  {travel.tags.map((tag, index) => (
                    <Badge key={index}>{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
