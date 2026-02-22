import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDownIcon } from 'lucide-react'
import { DateRange, Locale } from 'react-day-picker'
import { format } from 'date-fns'

import { cn } from '@/shared/lib/styles/utils'
import { getDateFnsLocale, getDayPickerLocale, type AppLocale } from '@/shared/lib/i18n'
import { Button } from './button'
import { Calendar } from './calendar'
import { Label } from './label'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

interface DateRangePickerProps {
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
  disabled?: boolean
  label?: string
  placeholder?: string
  id?: string
  className?: string
  appLocale?: AppLocale
  locale?: Locale
  captionLayout?: 'dropdown'
}

export const DateRangePicker = ({
  value,
  onChange,
  disabled = false,
  label,
  placeholder: placeholderProp,
  id,
  className,
  appLocale = 'ru',
  locale: localeProp,
  ...calendarProps
}: DateRangePickerProps) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const dayPickerLocale = localeProp ?? getDayPickerLocale(appLocale)
  const dateFnsLocale = getDateFnsLocale(appLocale)
  const placeholder = placeholderProp ?? t('form.dateRangePlaceholder')

  const formatDateRange = () => {
    if (!value?.from) return placeholder
    if (!value.to) return format(value.from, 'PPP', { locale: dateFnsLocale })

    return `${format(value.from, 'PPP', { locale: dateFnsLocale })} - ${format(value.to, 'PPP', { locale: dateFnsLocale })}`
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {label && (
        <Label htmlFor={id} className='px-1'>
          {label}
        </Label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant='outline'
            className={cn('justify-between font-normal', !value?.from && 'text-muted-foreground')}
            disabled={disabled}
          >
            {formatDateRange()}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto overflow-hidden p-0' align='center'>
          <Calendar
            mode='range'
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
            locale={dayPickerLocale}
            disabled={disabled}
            {...calendarProps}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
