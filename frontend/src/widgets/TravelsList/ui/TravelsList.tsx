import { useTranslation } from 'react-i18next'
import { Plane } from 'lucide-react'
import { Travel, TravelCard } from '@/entities/travel'
import { useSettings } from '@/features/settings'
import type { AppLocale } from '@/shared/lib/i18n'
import { cn } from '@/shared/lib'
import {
  Empty,
  EmptyMedia,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  Button,
  Skeleton
} from '@/shared/ui'
import { useCreateTravelAction } from '@/features/travel/create'
import { useNavigate } from 'react-router-dom'
import { useTravelActions } from '../model/useTravelActions'

interface TravelsListProps {
  travels: Travel[]
  className?: string
  emptyMessage?: string
  allowCreate?: boolean
  isLoading?: boolean
  error?: unknown
}

export const TravelsList = ({
  travels,
  className,
  emptyMessage,
  allowCreate = true,
  isLoading = false,
  error
}: TravelsListProps) => {
  const { t } = useTranslation()
  const { getSetting } = useSettings()
  const appLocale = (getSetting('locale') ?? 'ru') as AppLocale
  const { createTravel } = useCreateTravelAction()
  const actions = useTravelActions()
  const resolvedEmptyMessage = emptyMessage ?? t('travelsList.noTravels')

  const navigate = useNavigate()
  const navigateToTravel = (travelId: string) => navigate(`/travels/${travelId}`)

  if (isLoading) {
    return (
      <div className={cn('flex gap-4 flex-wrap', className)}>
        <Skeleton className='h-[146px] w-full rounded-lg' />
        <Skeleton className='h-[146px] w-full rounded-lg' />
        <Skeleton className='h-[146px] w-full rounded-lg' />
      </div>
    )
  }

  if (error) {
    return (
      <div className={cn('flex gap-4 flex-wrap', className)}>
        <div className='rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive'>
          {t('travelsList.loadError')}
        </div>
      </div>
    )
  }

  if (travels.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia className='rounded-full bg-muted/50 p-4'>
            <Plane className='h-12 w-12 text-muted-foreground/50' />
          </EmptyMedia>
          <EmptyTitle>{resolvedEmptyMessage}</EmptyTitle>
          <EmptyDescription>{t('travelsList.emptyDescription')}</EmptyDescription>
        </EmptyHeader>
        {allowCreate && (
          <EmptyContent>
            <Button onClick={createTravel}>{t('nav.newTravel')}</Button>
          </EmptyContent>
        )}
      </Empty>
    )
  }

  return (
    <div className={cn('flex gap-4 flex-wrap', className)}>
      {travels.map(travel => (
        <TravelCard
          key={travel.id}
          name={travel.name}
          tags={travel.tags}
          startDate={travel.start_date}
          endDate={travel.end_date}
          actions={actions(travel)}
          onClick={() => navigateToTravel(travel.id)}
          locale={appLocale}
        />
      ))}
    </div>
  )
}
