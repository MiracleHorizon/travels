import { useParams } from 'react-router-dom'

import { useTravelQuery } from '@/entities/travel'
import { Spinner, Badge, Card, CardContent, CardTitle, TabsContent } from '@/shared/ui'
import { ExpensesList } from '@/widgets/ExpensesList'

export const TravelDetailPage = () => {
  const { travelId } = useParams<{ travelId: string }>()
  const { data: travel, isLoading, error } = useTravelQuery(travelId)

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-full'>
        <Spinner className='h-12 w-12' />
      </div>
    )
  }

  if (error || !travel) {
    return 'Пусто'
  }

  return (
    <TabsContent value='main'>
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
    </TabsContent>
  )
}
