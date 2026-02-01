import { Tag } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import {
  Input,
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  TagsInput,
  DateRangePicker,
  Textarea
} from '@/shared/ui'
import { ChangeEvent } from 'react'

interface TravelFormData {
  name: string
  description: string
  dateRange: DateRange | undefined
  tags: string[]
}

interface TravelFormProps {
  value: TravelFormData
  onChange: (value: TravelFormData) => void
  onSubmit: () => void
  disabled?: boolean
}

export const TravelForm = ({ value, onChange, disabled = false, onSubmit }: TravelFormProps) => {
  const handleDestinationChange = (ev: ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      name: ev.target.value
    })
  }

  const handleDescriptionChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    onChange({
      ...value,
      description: ev.target.value
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
        {/* Название */}
        <Field>
          <FieldLabel>Название</FieldLabel>
          <Input
            type='text'
            placeholder='Пхукет, 2026'
            value={value.name}
            onChange={handleDestinationChange}
            disabled={disabled}
          />
        </Field>

        {/* Временные рамки */}
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

        {/* Описание */}
        <Field>
          <FieldLabel>Описание</FieldLabel>
          <Textarea
            placeholder='Опишите ваше путешествие...'
            value={value.description}
            onChange={handleDescriptionChange}
            disabled={disabled}
            rows={6}
          />
        </Field>

        {/* Тэги */}
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
      </FieldGroup>
    </form>
  )
}
