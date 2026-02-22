import { Tag } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { useTranslation } from 'react-i18next'

import {
  Input,
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  TagsInput,
  DateRangePicker,
  Textarea,
  FieldContent,
  LocationPicker
} from '@/shared/ui'
import { useSettings } from '@/features/settings'
import { ChangeEvent } from 'react'
import { GeoLocationResult } from '@/shared/api/geo'
import type { AppLocale } from '@/shared/lib/i18n'

interface TravelFormData {
  name: string
  description: string
  dateRange: DateRange | undefined
  tags: string[]
  destination: GeoLocationResult | null
}

interface TravelFormProps {
  values: TravelFormData
  onChange: (value: TravelFormData) => void
  onSubmit: () => void
  disabled?: boolean
}

export const TravelForm = ({ values, onChange, disabled = false, onSubmit }: TravelFormProps) => {
  const { t } = useTranslation()
  const { getSetting } = useSettings()
  const appLocale = (getSetting('locale') ?? 'ru') as AppLocale

  const handleNameChange = (ev: ChangeEvent<HTMLInputElement>) => {
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

  const handleDestinationChange = (destination: GeoLocationResult | null) => {
    onChange({
      ...values,
      destination
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
            <FieldLabel htmlFor='name'>{t('form.travel.name')}</FieldLabel>
            <Input
              id='name'
              type='text'
              autoComplete='off'
              placeholder={t('form.travel.namePlaceholder')}
              value={values.name}
              onChange={handleNameChange}
              disabled={disabled}
            />
          </FieldContent>
        </Field>

        <Field>
          <FieldContent>
            <FieldLabel htmlFor='destination'>{t('form.travel.destination')}</FieldLabel>
            <LocationPicker
              id='destination'
              value={values.destination}
              onChange={handleDestinationChange}
              placeholder={t('form.travel.destinationPlaceholder')}
              disabled={disabled}
            />
          </FieldContent>
        </Field>

        <Field>
          <FieldContent>
            <FieldLabel htmlFor='dateRange'>{t('form.travel.dateRange')}</FieldLabel>
            <DateRangePicker
              id='dateRange'
              value={values.dateRange}
              onChange={handleDateRangeChange}
              disabled={disabled}
              placeholder={t('form.travel.dateRangePlaceholder')}
              captionLayout='dropdown'
              appLocale={appLocale}
            />
          </FieldContent>
        </Field>

        <Field>
          <FieldContent>
            <FieldLabel htmlFor='description'>{t('form.travel.description')}</FieldLabel>
            <Textarea
              id='description'
              placeholder={t('form.travel.descriptionPlaceholder')}
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
            {t('form.travel.tags')}
          </FieldLabel>

          <FieldDescription>{t('form.travel.tagsHint')}</FieldDescription>

          <TagsInput
            value={values.tags}
            onChange={handleTagsChange}
            disabled={disabled}
            placeholder={t('form.travel.tagsPlaceholder')}
          />
        </Field>
      </FieldGroup>
    </form>
  )
}
