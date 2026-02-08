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
  Textarea,
  FieldContent
} from '@/shared/ui'
import { ChangeEvent } from 'react'

interface TravelFormData {
  name: string
  description: string
  dateRange: DateRange | undefined
  tags: string[]
}

interface TravelFormProps {
  values: TravelFormData
  onChange: (value: TravelFormData) => void
  onSubmit: () => void
  disabled?: boolean
}

export const TravelForm = ({ values, onChange, disabled = false, onSubmit }: TravelFormProps) => {
  const handleDestinationChange = (ev: ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...values,
      name: ev.target.value
    })
  }

  const handleDescriptionChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    onChange({
      ...values,
      description: ev.target.value
    })
  }

  const handleDateRangeChange = (range: DateRange | undefined) => {
    onChange({
      ...values,
      dateRange: range
    })
  }

  const handleTagsChange = (tags: string[]) => {
    onChange({
      ...values,
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
          <FieldContent>
            <FieldLabel htmlFor='name'>Название</FieldLabel>
            <Input
              id='name'
              type='text'
              autoComplete='off'
              placeholder='Пхукет, 2026'
              value={values.name}
              onChange={handleDestinationChange}
              disabled={disabled}
            />
          </FieldContent>
        </Field>

        <Field>
          <FieldContent>
            <FieldLabel htmlFor='dateRange'>Временные рамки</FieldLabel>
            <DateRangePicker
              id='dateRange'
              value={values.dateRange}
              onChange={handleDateRangeChange}
              disabled={disabled}
              placeholder='Выберите даты'
              captionLayout='dropdown'
            />
          </FieldContent>
        </Field>

        <Field>
          <FieldContent>
            <FieldLabel htmlFor='description'>Описание</FieldLabel>
            <Textarea
              id='description'
              placeholder='Опишите ваше путешествие...'
              value={values.description}
              onChange={handleDescriptionChange}
              disabled={disabled}
              rows={6}
            />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel className='flex items-center gap-2'>
            <Tag className='w-4 h-4' />
            Теги
          </FieldLabel>

          <FieldDescription>
            Добавьте теги для категоризации путешествия (например: пляж, горы, культура)
          </FieldDescription>

          <TagsInput value={values.tags} onChange={handleTagsChange} disabled={disabled} />
        </Field>
      </FieldGroup>
    </form>
  )
}
