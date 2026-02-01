import { CalendarDays, Tag } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

import {
  Button,
  Input,
  Calendar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  TagsInput
} from '@/shared/ui'
import { ChangeEvent } from 'react'

interface TravelFormData {
  destination: string
  dateRange: DateRange | undefined
  tags: string[]
}

interface TravelFormProps {
  value: TravelFormData
  onChange: (value: TravelFormData) => void
  onSubmit: () => void
  disabled?: boolean
  error?: string | null
}

export const TravelForm = ({
  value,
  onChange,
  disabled = false,
  error,
  onSubmit
}: TravelFormProps) => {
  const handleDestinationChange = (ev: ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      destination: ev.target.value
    })
  }

  const handleDateRangeChange = (range: DateRange | undefined) => {
    onChange({
      ...value,
      dateRange: range
    })
  }

  const handleTagsChange = (tags: string[]) => {
    onChange({
      ...value,
      tags
    })
  }

  const formatDateRange = () => {
    if (!value.dateRange?.from) return 'Выберите даты'
    if (!value.dateRange.to) return format(value.dateRange.from, 'PPP', { locale: ru })

    return `${format(value.dateRange.from, 'PPP', {
      locale: ru
    })} - ${format(value.dateRange.to, 'PPP', {
      locale: ru
    })}`
  }

  return (
    <form
      onSubmit={ev => {
        ev.preventDefault()
        onSubmit()
      }}
    >
      <FieldGroup>
        <Field>
          <FieldLabel>Направление</FieldLabel>
          <Input
            type='text'
            placeholder='Сеул, Республика Корея'
            value={value.destination}
            onChange={handleDestinationChange}
            disabled={disabled}
          />
        </Field>

        <Field>
          <FieldLabel>Временные рамки</FieldLabel>

          <div className='flex items-center gap-x-2.5'>
            <FieldDescription className='w-full'>{formatDateRange()}</FieldDescription>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant='secondary' size='icon' disabled={disabled}>
                  <CalendarDays />
                </Button>
              </PopoverTrigger>

              <PopoverContent side='bottom' className='w-auto p-0'>
                <Calendar
                  mode='range'
                  selected={value.dateRange}
                  onSelect={handleDateRangeChange}
                  numberOfMonths={2}
                  locale={ru}
                  disabled={disabled}
                />
              </PopoverContent>
            </Popover>
          </div>
        </Field>

        <Field>
          <FieldLabel className='flex items-center gap-2'>
            <Tag className='w-4 h-4' />
            Теги
          </FieldLabel>
          <FieldDescription className='mb-2'>
            Добавьте теги для категоризации путешествия (например: пляж, горы, культура)
          </FieldDescription>
          <TagsInput value={value.tags} onChange={handleTagsChange} disabled={disabled} />
        </Field>

        {error && <div className='text-sm text-destructive'>{error}</div>}
      </FieldGroup>
    </form>
  )
}
