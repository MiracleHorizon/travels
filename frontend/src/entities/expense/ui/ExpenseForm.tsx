import { ChangeEvent } from 'react'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { ru as ruDateFns } from 'date-fns/locale'
import { ru as ruDayPicker } from 'react-day-picker/locale'

import {
  Button,
  Field,
  FieldContent,
  FieldLabel,
  Input,
  Textarea,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/shared/ui'
import { cn } from '@/shared/lib/styles/utils'
import { ExpenseCategorySelect } from './ExpenseCategorySelect'
import { ExpenseCategory } from '../model/types'

interface ExpenseFormData {
  title: string
  amount: string
  category: ExpenseCategory
  date: Date | undefined
  description: string
}

interface ExpenseFormProps {
  values: ExpenseFormData
  onChange: (value: ExpenseFormData) => void
  onSubmit: () => void
  disabled?: boolean
}

export const ExpenseForm = ({ values, onChange, disabled = false, onSubmit }: ExpenseFormProps) => {
  const handleTitleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...values,
      title: ev.target.value
    })
  }

  const handleAmountChange = (ev: ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...values,
      amount: ev.target.value
    })
  }

  const handleCategoryChange = (category: ExpenseCategory) => {
    onChange({
      ...values,
      category
    })
  }

  const handleDateChange = (date: Date | undefined) => {
    onChange({
      ...values,
      date
    })
  }

  const handleDescriptionChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    onChange({
      ...values,
      description: ev.target.value
    })
  }

  return (
    <form
      onSubmit={ev => {
        ev.preventDefault()
        onSubmit()
      }}
    >
      <div className='space-y-4 mt-2'>
        <Field>
          <FieldContent>
            <FieldLabel htmlFor='title'>Название</FieldLabel>
            <Input
              id='title'
              type='text'
              placeholder='Обед в кафе'
              autoComplete='off'
              value={values.title}
              onChange={handleTitleChange}
              disabled={disabled}
            />
          </FieldContent>
        </Field>

        <div className='grid grid-cols-2 gap-4'>
          <Field>
            <FieldContent>
              <FieldLabel htmlFor='amount'>Сумма</FieldLabel>
              <Input
                id='amount'
                type='number'
                placeholder='156$'
                value={values.amount}
                onChange={handleAmountChange}
                disabled={disabled}
                step='1'
                min='0'
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldContent>
              <FieldLabel htmlFor='category'>Категория</FieldLabel>
              <ExpenseCategorySelect
                id='category'
                value={values.category}
                onChange={handleCategoryChange}
                disabled={disabled}
              />
            </FieldContent>
          </Field>
        </div>

        <Field>
          <FieldContent>
            <FieldLabel htmlFor='date'>Дата</FieldLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id='date'
                  variant='outline'
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !values.date && 'text-muted-foreground'
                  )}
                  disabled={disabled}
                >
                  <CalendarIcon className='h-4 w-4' />
                  {values.date ? (
                    format(values.date, 'PPP', { locale: ruDateFns })
                  ) : (
                    <span>Выберите дату</span>
                  )}
                </Button>
              </PopoverTrigger>

              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                  mode='single'
                  selected={values.date}
                  onSelect={handleDateChange}
                  locale={ruDayPicker}
                />
              </PopoverContent>
            </Popover>
          </FieldContent>
        </Field>

        <Field>
          <FieldContent>
            <FieldLabel htmlFor='description'>Описание</FieldLabel>
            <Textarea
              id='description'
              placeholder='Расскажите, чем была вызвана эта трата и стоила ли она того?'
              value={values.description}
              onChange={handleDescriptionChange}
              disabled={disabled}
              rows={3}
            />
          </FieldContent>
        </Field>
      </div>
    </form>
  )
}
