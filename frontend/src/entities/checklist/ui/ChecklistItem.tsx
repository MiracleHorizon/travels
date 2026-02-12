import { AlertCircle, X } from 'lucide-react'
import { cn } from '@/shared/lib'
import { Button, Checkbox, Item, ItemActions, TooltipComposer } from '@/shared/ui'
import { ChecklistItemPriority } from '../model/types'
import { useState } from 'react'

interface ChecklistItemProps {
  text: string
  completed: boolean
  priority: ChecklistItemPriority
  onToggle: () => void
  onDelete: () => void
}

export const ChecklistItem = ({
  completed,
  text,
  priority,
  onToggle,
  onDelete
}: ChecklistItemProps) => {
  const [hovered, setHovered] = useState(false)

  const handleMouseEnter = () => setHovered(true)
  const handleMouseLeave = () => setHovered(false)

  return (
    <Item
      size='sm'
      className='cursor-pointer hover:bg-accent/50 px-2.5 py-1'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onToggle}
    >
      <Checkbox checked={completed} onCheckedChange={onToggle} />

      <span className={cn('flex-1 text-sm', completed && 'line-through text-muted-foreground')}>
        {text}
      </span>

      {priority === 'high' && !completed && (
        <TooltipComposer content='Высокий приоритет'>
          <AlertCircle className='w-4 h-4 text-destructive shrink-0' />
        </TooltipComposer>
      )}

      <ItemActions
        className={cn('gap-1 opacity-0 transition-opacity duration-200', hovered && 'opacity-100')}
      >
        <TooltipComposer content='Удалить'>
          <Button variant='secondary' size='icon-xs' onClick={onDelete}>
            <X className='size-3.5' />
          </Button>
        </TooltipComposer>
      </ItemActions>
    </Item>
  )
}
