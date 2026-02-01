import { useState } from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { format } from 'date-fns'
import { ru } from 'react-day-picker/locale'

import { cn } from '@/shared/lib/styles/utils'
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
  locale?: typeof ru
}

export const DateRangePicker = ({
  value,
  onChange,
  disabled = false,
  label,
  placeholder = 'Выберите диапазон',
  id,
  className,
  locale = ru
}: DateRangePickerProps) => {
  const [open, setOpen] = useState(false)

  const formatDateRange = () => {
    if (!value?.from) return placeholder
    if (!value.to) return format(value.from, 'PPP', { locale })

    return `${format(value.from, 'PPP', { locale })} - ${format(value.to, 'PPP', { locale })}`
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
            locale={locale}
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
