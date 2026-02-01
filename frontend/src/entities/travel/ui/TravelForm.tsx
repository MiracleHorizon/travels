import { Tag } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import {
  Input,
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  TagsInput,
  DateRangePicker
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
          <DateRangePicker
            value={value.dateRange}
            onChange={handleDateRangeChange}
            disabled={disabled}
            placeholder='Выберите даты'
            captionLayout='dropdown'
          />
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
