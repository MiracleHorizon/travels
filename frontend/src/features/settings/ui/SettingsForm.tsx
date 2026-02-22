import { useTranslation } from 'react-i18next'
import {
  Field,
  FieldLabel,
  FieldGroup,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  FieldContent
} from '@/shared/ui'
import { ThemeToggle } from '@/entities/theme'
import { MEASUREMENT_OPTIONS, TIME_FORMAT_OPTIONS, LOCALE_OPTIONS } from '../model/options'
import type { MeasurementUnit, TimeFormat, Locale } from '../model/types'

interface SettingsFormValue {
  timeFormat: TimeFormat
  measurementUnit: MeasurementUnit
  locale: Locale
}

interface SettingsFormProps {
  value: SettingsFormValue
  onChange: (value: SettingsFormValue) => void
}

export const SettingsForm = ({ value, onChange }: SettingsFormProps) => {
  const { t } = useTranslation()

  return (
    <FieldGroup>
      <Field orientation='responsive'>
        <FieldContent>
          <FieldLabel htmlFor='locale'>{t('settings.language')}</FieldLabel>
        </FieldContent>
        <Select
          value={value.locale}
          onValueChange={(v: Locale) =>
            onChange({
              ...value,
              locale: v
            })
          }
        >
          <SelectTrigger id='locale' size='sm' className='min-w-[150px]'>
            <SelectValue />
          </SelectTrigger>

          <SelectContent position='popper'>
            <SelectGroup>
              {LOCALE_OPTIONS.map(({ value: optValue }) => (
                <SelectItem key={optValue} value={optValue}>
                  {t(`settings.locale.${optValue}`)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      <Field orientation='responsive'>
        <FieldContent>
          <FieldLabel htmlFor='measurementUnit'>{t('settings.measurementUnit')}</FieldLabel>
        </FieldContent>
        <Select
          value={value.measurementUnit}
          onValueChange={(v: MeasurementUnit) =>
            onChange({
              ...value,
              measurementUnit: v
            })
          }
        >
          <SelectTrigger id='measurementUnit' size='sm' className='min-w-[150px]'>
            <SelectValue />
          </SelectTrigger>

          <SelectContent position='popper'>
            <SelectGroup>
              {MEASUREMENT_OPTIONS.map(({ value: optValue }) => (
                <SelectItem key={optValue} value={optValue}>
                  {t(`settings.measurement.${optValue}`)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      <Field orientation='responsive'>
        <FieldContent>
          <FieldLabel htmlFor='timeFormat'>{t('settings.timeFormat')}</FieldLabel>
        </FieldContent>

        <Select
          value={value.timeFormat}
          onValueChange={(v: TimeFormat) =>
            onChange({
              ...value,
              timeFormat: v
            })
          }
        >
          <SelectTrigger id='timeFormat' size='sm' className='min-w-[150px]'>
            <SelectValue />
          </SelectTrigger>

          <SelectContent position='popper'>
            <SelectGroup>
              {TIME_FORMAT_OPTIONS.map(({ value: optValue }) => (
                <SelectItem key={optValue} value={optValue}>
                  {t(`settings.timeFormatOption.${optValue}`)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      <Field orientation='responsive'>
        <FieldContent>
          <FieldLabel>{t('settings.theme')}</FieldLabel>
        </FieldContent>

        <ThemeToggle className='min-w-[150px]' />
      </Field>
    </FieldGroup>
  )
}
