import { Card, Badge } from '@/shared/ui'
import { useTranslation } from 'react-i18next'
import { type AppLocale, plural } from '@/shared/lib/i18n'
import { Calendar, Clock } from 'lucide-react'
import { differenceInDays } from 'date-fns'
import { ReactNode } from 'react'

import { formatTravelDateRange } from '../lib/formatters'

interface TravelCoverProps {
  name: string
  startDate: string
  endDate: string
  isPast: boolean
  locale: AppLocale
  renderGallery?: () => ReactNode
}

export const TravelCover = ({
  startDate,
  endDate,
  name,
  isPast,
  locale,
  renderGallery
}: TravelCoverProps) => {
  const { t } = useTranslation()

  const duration = differenceInDays(endDate, startDate)

  const durationLabel = plural({
    count: duration,
    forms: {
      one: t('travelPage.day_one'),
      few: t('travelPage.day_few'),
      many: t('travelPage.day_many'),
      other: t('travelPage.day_many')
    },
    locale
  })

  return (
    <Card className='overflow-hidden border-0 p-0'>
      <div className='relative h-[400px] w-full'>
        {renderGallery()}

        <div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent pointer-events-none' />

        <div className='absolute bottom-0 left-0 right-0 px-8 pb-8 text-white'>
          <div className='flex items-end justify-between gap-4'>
            <div className='flex-1'>
              <h1 className='text-4xl font-bold mb-3'>{name}</h1>

              <div className='flex flex-wrap items-center gap-4 text-white/90'>
                <div className='flex items-center gap-2'>
                  <Calendar className='h-5 w-5' />
                  <span className='text-lg'>
                    {formatTravelDateRange({
                      startDate,
                      endDate,
                      locale
                    })}
                  </span>
                </div>

                <div className='flex items-center gap-2'>
                  <Clock className='h-5 w-5' />
                  <span className='text-lg'>
                    {duration} {durationLabel}
                  </span>
                </div>
              </div>
            </div>

            <Badge variant={isPast ? 'secondary' : 'default'} className='text-sm px-3 py-1'>
              {isPast ? t('travelPage.completed') : t('travelPage.upcoming')}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  )
}
