import { useParams } from 'react-router-dom'
import { useTravelQuery, TravelCover, TravelGallery } from '@/entities/travel'
import { Spinner, Badge, Card, CardContent, CardTitle, Button } from '@/shared/ui'
import { ExpensesList } from '@/widgets/ExpensesList'
import { TravelDetailPageEmpty } from './TravelDetailPageEmpty'
import { useUploadTravelPhotoAction } from '@/features/travel/upload-photo'

import AutoplayPlugin from 'embla-carousel-autoplay'
import FadePlugin from 'embla-carousel-fade'
import { Upload } from 'lucide-react'

const MOCK_IMAGES: string[] = [
  'https://avatar.vercel.sh/shadcn1',
  'https://avatar.vercel.sh/shadcn2',
  'https://avatar.vercel.sh/shadcn3',
  'https://avatar.vercel.sh/shadcn4',
  'https://avatar.vercel.sh/shadcn5',
  'https://avatar.vercel.sh/shadcn6',
  'https://avatar.vercel.sh/shadcn7',
  'https://avatar.vercel.sh/shadcn8',
  'https://avatar.vercel.sh/shadcn9',
  'https://avatar.vercel.sh/shadcn10'
] as const

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
    <div className='flex flex-col gap-6'>
      <TravelCover
        name={travel.name}
        startDate={travel.start_date}
        endDate={travel.end_date}
        isPast={travel.status === 'past'}
        renderGallery={() => (
          <TravelGallery
            images={MOCK_IMAGES}
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

      <div className='flex justify-end'>
        <Button onClick={() => uploadTravelPhoto(travelId)}>
          <Upload className='h-5 w-5' aria-hidden={true} />
          Загрузить фотографию
        </Button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2 space-y-6'>
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

        <div className='space-y-6'>
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
