import { ChevronDown, Plus, type LucideIcon } from 'lucide-react'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  TotalCount,
  Button
} from '@/shared/ui'
import { cn } from '@/shared/lib'
import type { ChecklistItemModel } from '../model/types'
import type { ReactNode } from 'react'

interface ChecklistCategoryProps {
  name: string
  items: ChecklistItemModel[]
  icon: LucideIcon
  defaultOpen?: boolean
  renderItem: (item: ChecklistItemModel) => ReactNode
}

export const ChecklistCategory = ({
  name,
  items,
  icon: Icon,
  defaultOpen = false,
  renderItem
}: ChecklistCategoryProps) => {
  const completedCount = items.filter(item => item.completed).length
  const totalCount = items.length

  return (
    <Collapsible defaultOpen={defaultOpen}>
      <CollapsibleTrigger
        className={cn(
          'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium',
          'hover:bg-muted/60 transition-colors'
        )}
      >
        <span className='flex items-center gap-2'>
          <Icon className='h-4 w-4 shrink-0 text-muted-foreground' />
          {name}
        </span>

        <span className='flex items-center gap-2'>
          <TotalCount completedCount={completedCount} totalCount={totalCount} />
          <ChevronDown className='size-4 shrink-0 transition-transform' />
        </span>
      </CollapsibleTrigger>

      <CollapsibleContent>
        {totalCount > 0 && (
          <div className='space-y-1 pl-2 pt-2 pb-3'>{items.map(item => renderItem(item))}</div>
        )}

        {totalCount === 0 && (
          <Button
            variant='ghost'
            size='sm'
            className='wull'
            onClick={() => {
              console.log('add item')
            }}
          >
            <Plus className='size-4' />
            Добавить задачу
          </Button>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}
