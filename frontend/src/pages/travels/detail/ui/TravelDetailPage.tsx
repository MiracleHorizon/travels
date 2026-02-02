import { useParams } from 'react-router-dom'
import { useTravelQuery, TravelCover } from '@/entities/travel'
import { Spinner, Badge, Card, CardContent, CardTitle } from '@/shared/ui'
import { ExpensesList } from '@/widgets/ExpensesList'
import { TravelDetailPageEmpty } from './TravelDetailPageEmpty'

export const TravelDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data: travel, isLoading, error } = useTravelQuery(id)

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
        startDate={travel.startDate}
        endDate={travel.endDate}
        isPast={travel.status === 'past'}
      />

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
          {travel.tags.length > 0 && (
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
