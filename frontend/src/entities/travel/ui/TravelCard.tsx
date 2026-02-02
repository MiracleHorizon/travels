import { Calendar, Tag } from 'lucide-react'
import { Travel } from '../model/types'
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@/shared/ui'
import { cn } from '@/shared/lib/styles/utils'
import { formatTravelDateRange } from '../lib/formatters'
import { memo } from 'react'

interface TravelCardProps {
  travel: Travel
  className?: string
  onClick?: () => void
}

export const TravelCard = memo(({ travel, className, onClick }: TravelCardProps) => {
  return (
    <Card
      className={cn(
        'group relative w-[340px] max-w-sm pt-0 overflow-hidden',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {/* <div className='absolute inset-0 z-30 aspect-video bg-black/35 group-hover:scale-110 transition-transform duration-500 ease-out' /> */}

      <img
        src='https://avatar.vercel.sh/shadcn5'
        alt='Travel cover'
        className='relative aspect-video w-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out'
      />

      <CardHeader className='gap-3'>
        <CardTitle title={travel.name} className='truncate'>
          {travel.name}
        </CardTitle>
      </CardHeader>

      <CardContent className='gap-4 flex flex-col'>
        <div className='flex items-center gap-2 text-sm text-muted-foreground truncate'>
          <Calendar className='h-4 w-4 shrink-0' />
          <span>{formatTravelDateRange(travel.startDate, travel.endDate)}</span>
        </div>

        {Boolean(travel.tags.length) && (
          <div className='flex items-center gap-2'>
            <Tag className='h-4 w-4 shrink-0 text-muted-foreground' />
            <div className='flex flex-wrap gap-2'>
              {travel.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index}>{tag}</Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
})
