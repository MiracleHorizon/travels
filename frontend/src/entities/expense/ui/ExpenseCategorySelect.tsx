import { Button } from '@/shared/ui'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/shared/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { EXPENSE_CATEGORIES, EXPENSE_CATEGORY_ICONS } from '../model/consts'
import type { ExpenseCategory } from '../model/types'

interface ExpenseCategorySelectProps {
  id?: string
  value: ExpenseCategory
  onChange: (category: ExpenseCategory) => void
  disabled?: boolean
  placeholder?: string
}

const categories = Object.entries(EXPENSE_CATEGORIES) as [ExpenseCategory, string][]

export const ExpenseCategorySelect = ({
  id,
  value,
  onChange,
  disabled = false,
  placeholder = 'Выберите категорию'
}: ExpenseCategorySelectProps) => {
  const SelectedIcon = value ? EXPENSE_CATEGORY_ICONS[value] : null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button id={id} variant='outline' className='w-full justify-between' disabled={disabled}>
          <span className='flex items-center gap-2 font-normal'>
            {SelectedIcon && <SelectedIcon className='size-4' />}
            {value ? (
              EXPENSE_CATEGORIES[value]
            ) : (
              <span className='text-muted-foreground'>{placeholder}</span>
            )}
          </span>

          <ChevronDown className='h-4 w-4 opacity-50' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-full' align='start'>
        {categories.map(([key, label]) => {
          const Icon = EXPENSE_CATEGORY_ICONS[key]

          return (
            <DropdownMenuItem key={key} onClick={() => onChange(key)}>
              <Icon className='size-4' />
              {label}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
