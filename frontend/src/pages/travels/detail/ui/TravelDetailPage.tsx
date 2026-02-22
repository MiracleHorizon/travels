import { useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { ExpensesList } from '@/widgets/ExpensesList'
import { WeatherWidget } from '@/widgets/WeatherWidget'
import { TravelMapPreview, TravelDetailed } from '@/entities/travel'
import { Badge, Card, CardContent, CardTitle, TabsContent } from '@/shared/ui'

export const TravelDetailPage = () => {
  const { t } = useTranslation()
  const { travel } = useOutletContext<{ travel: TravelDetailed }>()

  return (
    <TabsContent value='main'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        <div className='lg:col-span-2 space-y-4'>
          {travel.description && (
            <Card>
              <CardContent>
                <CardTitle className='text-lg mb-2'>{t('travelPage.description')}</CardTitle>
                <p className='text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap'>
                  {travel.description}
                </p>
              </CardContent>
            </Card>
          )}

          <ExpensesList travelId={travel.id} />
        </div>

        <div className='space-y-4'>
          {travel.coords && <WeatherWidget coords={travel.coords} />}

          <TravelMapPreview travelId={travel.id} />

          {Boolean(travel.tags.length) && (
            <Card>
              <CardContent>
                <CardTitle className='text-lg mb-2'>{t('travelPage.tags')}</CardTitle>
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
