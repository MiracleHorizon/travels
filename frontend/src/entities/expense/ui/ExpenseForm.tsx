import { ChangeEvent } from 'react'
import { CalendarIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'

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
  PopoverTrigger,
  FieldDescription
} from '@/shared/ui'
import { AppLocale, getDateFnsLocale, getDayPickerLocale } from '@/shared/lib/i18n'
import { cn } from '@/shared/lib/styles/utils'
import { ExpenseCategorySelect } from './ExpenseCategorySelect'
import { ExpenseCategory } from '../model/types'

interface ExpenseFormData {
  title: string
  amount: string
  category: ExpenseCategory
  date: Date | undefined
  description: string
  link: string
}

interface ExpenseFormProps {
  values: ExpenseFormData
  disabled?: boolean
  locale: AppLocale
  onChange: (value: ExpenseFormData) => void
  onSubmit: () => void
}

export const ExpenseForm = ({
  values,
  disabled = false,
  locale,
  onSubmit,
  onChange
}: ExpenseFormProps) => {
  const { t } = useTranslation()

  const dateFnsLocale = getDateFnsLocale(locale)
  const dayPickerLocale = getDayPickerLocale(locale)

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

  const handleLinkChange = (ev: ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...values,
      link: ev.target.value
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
            <FieldLabel htmlFor='title'>{t('form.expense.title')}</FieldLabel>
            <Input
              id='title'
              type='text'
              placeholder={t('form.expense.titlePlaceholder')}
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
              <FieldLabel htmlFor='amount'>{t('form.expense.amount')}</FieldLabel>
              <Input
                id='amount'
                type='number'
                placeholder={t('form.expense.amountPlaceholder')}
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
              <FieldLabel htmlFor='category'>{t('form.expense.category')}</FieldLabel>
              <ExpenseCategorySelect
                id='category'
                value={values.category}
                onChange={handleCategoryChange}
                disabled={disabled}
                placeholder={t('form.expense.categoryPlaceholder')}
              />
            </FieldContent>
          </Field>
        </div>

        <Field>
          <FieldContent>
            <FieldLabel htmlFor='date'>{t('form.expense.date')}</FieldLabel>
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
                    format(values.date, 'PPP', { locale: dateFnsLocale })
                  ) : (
                    <span>{t('form.expense.datePlaceholder')}</span>
                  )}
                </Button>
              </PopoverTrigger>

              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                  mode='single'
                  selected={values.date}
                  onSelect={handleDateChange}
                  locale={dayPickerLocale}
                  captionLayout='dropdown'
                />
              </PopoverContent>
            </Popover>
          </FieldContent>
        </Field>

        <Field>
          <FieldContent>
            <FieldLabel htmlFor='description'>{t('form.expense.description')}</FieldLabel>
            <Textarea
              id='description'
              placeholder={t('form.expense.descriptionPlaceholder')}
              value={values.description}
              onChange={handleDescriptionChange}
              disabled={disabled}
              rows={3}
            />
          </FieldContent>
        </Field>

        <Field>
          <FieldContent>
            <FieldLabel htmlFor='link'>{t('form.expense.link')}</FieldLabel>
            <FieldDescription>{t('form.expense.linkHint')}</FieldDescription>
            <Input
              id='link'
              type='url'
              placeholder={t('form.expense.linkPlaceholder')}
              autoComplete='off'
              value={values.link}
              onChange={handleLinkChange}
              disabled={disabled}
            />
          </FieldContent>
        </Field>
      </div>
    </form>
  )
}
