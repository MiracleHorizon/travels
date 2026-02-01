import { Plane } from 'lucide-react'
import { Travel, TravelCard } from '@/entities/travel'
import { cn } from '@/shared/lib'
import {
  Empty,
  EmptyMedia,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  Button
} from '@/shared/ui'
import { useCreateTravelAction } from '@/features/travel/create'

interface TravelsListProps {
  travels: Travel[]
  className?: string
  emptyMessage?: string
  onTravelClick?: (travel: Travel) => void
}

export const TravelsList = ({
  travels,
  className,
  emptyMessage = 'Нет путешествий',
  onTravelClick
}: TravelsListProps) => {
  const { createTravel } = useCreateTravelAction()

  if (travels.length === 0) {
    return (
      <Empty className='py-16'>
        <EmptyHeader>
          <EmptyMedia className='rounded-full bg-muted/50 p-4'>
            <Plane className='h-12 w-12 text-muted-foreground/50' />
          </EmptyMedia>
          <EmptyTitle>{emptyMessage}</EmptyTitle>
          <EmptyDescription>
            Создайте своё первое путешествие, чтобы начать планирование
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={createTravel}>Новое путешествие</Button>
        </EmptyContent>
      </Empty>
    )
  }

  return (
    <div className={cn('flex gap-4', className)}>
      {travels.map(travel => (
        <TravelCard
          key={travel.id}
          travel={travel}
          onClick={onTravelClick ? () => onTravelClick(travel) : undefined}
        />
      ))}
    </div>
  )
}
