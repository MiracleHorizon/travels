import { EXPENSE_CATEGORIES, EXPENSE_CATEGORY_ICONS } from '../model/consts'
import type { ExpenseCategory, Expense } from '../model/types'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/shared/ui'
import { ChevronDown } from 'lucide-react'
import { formatCurrency } from '@/shared/lib/format'
import { cn } from '@/shared/lib'
import { ReactNode } from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/shared/ui/hover-card'
import { plural } from '@/shared/lib/i18n'
import { splitExpensesByCurrency } from '../model/splitExpensesByCurrency'

interface ExpenseCategorySectionProps {
  category: ExpenseCategory
  expenses: Expense[]
  locale: string
  defaultOpen?: boolean
  renderItem: (expense: Expense) => ReactNode
}

export const ExpenseCategorySection = ({
  expenses,
  locale,
  category,
  defaultOpen = false,
  renderItem
}: ExpenseCategorySectionProps) => {
  const categorySum = expenses.reduce((s, e) => s + +e.amount, 0)
  const CategoryIcon = EXPENSE_CATEGORY_ICONS[category]

  const isSingleCurrency =
    expenses.length > 1
      ? expenses.every(expense => expense.currency === expenses[0].category)
      : true

  const expensesByCurrency = splitExpensesByCurrency(expenses)

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
          {isSingleCurrency ? (
            <span className='text-muted-foreground font-normal'>
              {formatCurrency(categorySum, expenses[0].currency, locale)}
            </span>
          ) : (
            <HoverCard openDelay={200}>
              <HoverCardTrigger className='text-muted-foreground font-normal cursor-help underline decoration-dotted underline-offset-4 hover:text-foreground transition-colors'>
                {expensesByCurrency.length}{' '}
                {plural(expensesByCurrency.length, {
                  one: 'валюта',
                  few: 'валюты',
                  many: 'валют',
                  other: 'валют'
                })}
              </HoverCardTrigger>

              <HoverCardContent className='w-auto min-w-[150px] p-2'>
                <div className='flex flex-col gap-1.5'>
                  {expensesByCurrency.map(({ currency, amount }) => (
                    <div key={currency} className='flex text-xs items-center justify-between gap-8'>
                      <span>{currency}</span>
                      <span className='font-medium text-muted-foreground'>
                        {formatCurrency(amount, currency, locale)}
                      </span>
                    </div>
                  ))}
                </div>
              </HoverCardContent>
            </HoverCard>
          )}
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
