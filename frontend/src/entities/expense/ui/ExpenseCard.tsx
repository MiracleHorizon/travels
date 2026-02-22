import { useTranslation } from 'react-i18next'
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  Separator,
  Button,
  DropdownActions,
  TooltipComposer
} from '@/shared/ui'
import { ExpenseBadge } from './ExpenseBadge'
import type { ExpenseCategory } from '../model/types'
import type { DropdownAction } from '@/shared/ui'
import { Ellipsis, ExternalLinkIcon } from 'lucide-react'
import { useState } from 'react'
import { formatCurrency } from '@/shared/lib/format'
import { cn } from '@/shared/lib'
import { AppLocale } from '@/shared/lib/i18n'

interface ExpenseCardProps {
  title: string
  amount: number
  currency: string
  category: ExpenseCategory
  date?: string
  description?: string
  locale: AppLocale
  /**
   * Ссылка на внешний ресурс с дополнительной информацией о расходе.
   * Например, ссылка на отель, музей, ресторан.
   */
  link?: string
  size?: 'default' | 'sm'
  actions?: DropdownAction[]
  showCategoryBadge?: boolean
}

export const ExpenseCard = ({
  title,
  amount,
  currency,
  category,
  date,
  description,
  locale,
  link,
  size = 'default',
  actions,
  showCategoryBadge = false
}: ExpenseCardProps) => {
  const { t } = useTranslation()

  const formattedDate = date
    ? new Date(date).toLocaleDateString(locale, {
        day: 'numeric',
        month: 'short'
      })
    : null
  const formattedAmount = formatCurrency({
    amount,
    currency,
    locale
  })

  const [hovered, setHovered] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleMouseEnter = () => setHovered(true)
  const handleMouseLeave = () => setHovered(false)

  const showActions = hovered || dropdownOpen

  const handleOpenLink = () => {
    if (!link) return
    window.open(link, '_blank', 'noopener,noreferrer')
  }

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
          {showCategoryBadge && <ExpenseBadge category={category} />}

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

      {(actions || link) && (
        <ItemActions
          className={cn(
            'gap-1 opacity-0 transition-opacity duration-200',
            showActions && 'opacity-100'
          )}
        >
          {link && (
            <TooltipComposer content={t('form.expense.linkTooltip')}>
              <Button variant='outline' size='xs' onClick={handleOpenLink}>
                <ExternalLinkIcon />
                {t('form.expense.link')}
              </Button>
            </TooltipComposer>
          )}

          <DropdownActions
            trigger={
              actions && (
                <Button variant='outline' size='icon-xs' aria-label={t('travelsList.moreActions')}>
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
