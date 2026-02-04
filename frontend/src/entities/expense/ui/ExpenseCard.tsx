import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  Separator,
  Button,
  DropdownActions
} from '@/shared/ui'
import { ExpenseBadge } from './ExpenseBadge'
import type { ExpenseCategory } from '../model/types'
import type { DropdownAction } from '@/shared/ui'
import { Ellipsis } from 'lucide-react'
import { memo, useState } from 'react'
import { formatCurrency } from '@/shared/lib/format'
import { cn } from '@/shared/lib'

interface ExpenseCardProps {
  title: string
  amount: number
  currency: string
  category: ExpenseCategory
  date: string
  description?: string
  locale: string
  size?: 'default' | 'sm'
  actions?: DropdownAction[]
}

export const ExpenseCard = memo(
  ({
    title,
    amount,
    currency,
    category,
    date,
    description,
    locale,
    size = 'default',
    actions
  }: ExpenseCardProps) => {
    const formattedDate = date
      ? new Date(date).toLocaleDateString(locale, {
          day: 'numeric',
          month: 'short'
        })
      : null
    const formattedAmount = formatCurrency(amount, currency, locale)

    const [hovered, setHovered] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const handleMouseEnter = () => setHovered(true)
    const handleMouseLeave = () => setHovered(false)

    const showActions = hovered || dropdownOpen

    return (
      <Item
        variant='muted'
        size={size}
        className='rounded-lg items-start'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ItemContent>
          <ItemTitle>
            {title}
            <ExpenseBadge category={category} />

            {formattedDate && (
              <>
                <Separator orientation='vertical' className='h-4 shrink-0' />
                <p className='text-xs text-muted-foreground'>{formattedDate}</p>
              </>
            )}
          </ItemTitle>

          {description && <ItemDescription>{description}</ItemDescription>}
          <p className='text-lg font-semibold'>{formattedAmount}</p>
        </ItemContent>

        {actions && (
          <ItemActions
            className={cn(
              'flex-col items-end opacity-0 transition-opacity duration-200',
              showActions && 'opacity-100'
            )}
          >
            <DropdownActions
              trigger={
                showActions && (
                  <Button variant='outline' size='icon-xs'>
                    <Ellipsis />
                  </Button>
                )
              }
              actions={actions}
              onOpenChange={setDropdownOpen}
            />
          </ItemActions>
        )}
      </Item>
    )
  }
)
