import { formatCurrency } from '@/shared/lib/format'
import { plural } from '@/shared/lib/i18n'
import { useCategoryExpenses } from '../model/useCategoryExpenses'
import { EXPENSE_CATEGORIES, EXPENSE_CATEGORY_ICONS } from '../model/consts'
import type { Expense } from '../model/types'

interface ExpenseCategoryGridProps {
  expenses: Expense[]
  currency: string
}

// TODO: Подумать куда пристроить.
export const ExpenseCategoryGrid = ({ expenses, currency }: ExpenseCategoryGridProps) => {
  const { categoryExpenses, total } = useCategoryExpenses({ expenses })

  return (
    <div className='flex-1 flex flex-col gap-1.5'>
      {categoryExpenses.map(({ category, amount, count }) => {
        const percentage = ((amount / total) * 100).toFixed(1)
        const categoryName = EXPENSE_CATEGORIES[category]
        const categoryAmount = formatCurrency(amount, currency)
        const Icon = EXPENSE_CATEGORY_ICONS[category]

        return (
          <div key={category} className='flex items-center gap-3 py-2'>
            <div className='flex items-center justify-center w-8 h-8 rounded-full bg-muted'>
              <Icon className='w-4 h-4 text-muted-foreground' />
            </div>
            <div className='flex-1 flex flex-col gap-0.5 min-w-0'>
              <span className='text-sm font-medium'>{categoryName}</span>
              <span className='text-xs text-muted-foreground'>
                {count}{' '}
                {plural(count, {
                  one: 'расход',
                  few: 'расхода',
                  many: 'расходов',
                  other: 'расходов'
                })}
              </span>
            </div>
            <div className='flex flex-col items-end gap-0.5'>
              <span className='text-sm font-semibold'>{categoryAmount}</span>
              <span className='text-xs text-muted-foreground'>{percentage}%</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
