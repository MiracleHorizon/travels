import { EXPENSE_CATEGORIES, EXPENSE_CATEGORY_ICONS } from '../model/consts'
import type { ExpenseCategory, Expense } from '../model/types'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/shared/ui'
import { ChevronDown } from 'lucide-react'
import { formatCurrency } from '@/shared/lib/format'
import { cn } from '@/shared/lib'
import { ReactNode } from 'react'

interface ExpenseCategorySectionProps {
  category: ExpenseCategory
  expenses: Expense[]
  locale: string
  currency: string
  defaultOpen?: boolean
  renderItem: (expense: Expense) => ReactNode
}

export const ExpenseCategorySection = ({
  expenses,
  locale,
  currency,
  category,
  defaultOpen = false,
  renderItem
}: ExpenseCategorySectionProps) => {
  const categorySum = expenses.reduce((s, e) => s + +e.amount, 0)
  const CategoryIcon = EXPENSE_CATEGORY_ICONS[category]

  return (
    <Collapsible defaultOpen={defaultOpen}>
      <CollapsibleTrigger
        className={cn(
          'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium',
          'hover:bg-muted/60 transition-colors [&[data-state=open]>svg]:rotate-180'
        )}
      >
        <span className='flex items-center gap-2'>
          <CategoryIcon className='h-4 w-4 shrink-0 text-muted-foreground' />
          {EXPENSE_CATEGORIES[category]}
        </span>
        <span className='flex items-center gap-2'>
          <span className='text-muted-foreground font-normal'>
            {formatCurrency(categorySum, currency, locale)}
          </span>
          <ChevronDown className='h-4 w-4 shrink-0 transition-transform' />
        </span>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className='space-y-2 pl-1 pt-2 pb-3'>
          {expenses.map(expense => (
            <div key={expense.id}>{renderItem(expense)}</div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
