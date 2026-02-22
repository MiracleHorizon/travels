import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/shared/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { EXPENSE_CATEGORY_ICONS } from '../model/consts'
import type { ExpenseCategory } from '../model/types'

const CATEGORY_KEYS: ExpenseCategory[] = [
  'transport',
  'accommodation',
  'food',
  'entertainment',
  'shopping',
  'other'
]

interface ExpenseCategorySelectProps {
  id?: string
  value: ExpenseCategory
  onChange: (category: ExpenseCategory) => void
  disabled?: boolean
  placeholder?: string
}

export const ExpenseCategorySelect = ({
  id,
  value,
  onChange,
  disabled = false,
  placeholder
}: ExpenseCategorySelectProps) => {
  const { t } = useTranslation()
  const resolvedPlaceholder = placeholder ?? t('form.expense.categoryPlaceholder')
  const SelectedIcon = value ? EXPENSE_CATEGORY_ICONS[value] : null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button id={id} variant='outline' className='w-full justify-between' disabled={disabled}>
          <span className='flex items-center gap-2 font-normal'>
            {SelectedIcon && <SelectedIcon className='size-4' />}
            {value ? (
              t(`form.expense.categories.${value}`)
            ) : (
              <span className='text-muted-foreground'>{resolvedPlaceholder}</span>
            )}
          </span>

          <ChevronDown className='h-4 w-4 opacity-50' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-full' align='start'>
        {CATEGORY_KEYS.map(key => {
          const Icon = EXPENSE_CATEGORY_ICONS[key]

          return (
            <DropdownMenuItem key={key} onClick={() => onChange(key)}>
              <Icon className='size-4' />
              {t(`form.expense.categories.${key}`)}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
