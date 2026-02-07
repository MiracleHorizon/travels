import { Calendar, Ellipsis, Tag } from 'lucide-react'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DropdownAction,
  DropdownActions
} from '@/shared/ui'
import { cn } from '@/shared/lib/styles/utils'
import { formatTravelDateRange } from '../lib/formatters'
import { useState } from 'react'

interface TravelCardProps {
  name: string
  startDate: string
  endDate: string
  tags: string[]
  className?: string
  actions?: DropdownAction[]
  onClick?: () => void
}

const MAX_BADGES_TO_SHOW = 3

export const TravelCard = ({
  name,
  startDate,
  endDate,
  tags,
  className,
  actions,
  onClick
}: TravelCardProps) => {
  const [hovered, setHovered] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleMouseEnter = () => setHovered(true)
  const handleMouseLeave = () => setHovered(false)

  const showActions = hovered || dropdownOpen

  return (
    <Card
      className={cn(
        '@container/travel-card group relative w-full overflow-hidden flex flex-row p-0 gap-0',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='relative w-36 shrink-0 overflow-hidden hidden @[600px]/travel-card:block'>
        <img
          src='https://avatar.vercel.sh/shadcn3'
          alt='Travel cover'
          className='h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out'
        />
      </div>

      <div className='flex flex-col h-full justify-center py-7 flex-1 min-w-0'>
        <CardHeader className='gap-2 pb-3'>
          <CardTitle title={name} className='truncate'>
            {name}
          </CardTitle>
        </CardHeader>

        <CardContent className='gap-3 flex flex-col pt-0'>
          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            <Calendar className='h-4 w-4 shrink-0' />
            <span>{formatTravelDateRange(startDate, endDate)}</span>
          </div>

          {Boolean(tags.length) && (
            <div className='flex items-center gap-2'>
              <Tag className='h-4 w-4 shrink-0 text-muted-foreground' />
              <div className='flex flex-wrap gap-2'>
                {tags.slice(0, MAX_BADGES_TO_SHOW).map((tag, index) => (
                  <Badge key={index}>{tag}</Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </div>

      {actions && showActions && (
        <DropdownActions
          trigger={
            <Button variant='secondary' size='icon-sm' className='absolute top-2 right-2'>
              <Ellipsis className='size-5' />
            </Button>
          }
          actions={actions}
          onOpenChange={setDropdownOpen}
        />
      )}
    </Card>
  )
}
