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
import { MEASUREMENT_OPTIONS, TIME_FORMAT_OPTIONS } from '../model/options'
import type { MeasurementUnit, TimeFormat } from '../model/types'

interface SettingsFormValue {
  timeFormat: TimeFormat
  measurementUnit: MeasurementUnit
}

interface SettingsFormProps {
  value: SettingsFormValue
  onChange: (value: SettingsFormValue) => void
}

export const SettingsForm = ({ value, onChange }: SettingsFormProps) => (
  <FieldGroup>
    <Field orientation='responsive'>
      <FieldContent>
        <FieldLabel htmlFor='measurementUnit'>Единицы измерения</FieldLabel>
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
            {MEASUREMENT_OPTIONS.map(({ value: optValue, label }) => (
              <SelectItem key={optValue} value={optValue}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>

    <Field orientation='responsive'>
      <FieldContent>
        <FieldLabel htmlFor='timeFormat'>Формат времени</FieldLabel>
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
            {TIME_FORMAT_OPTIONS.map(({ value: optValue, label }) => (
              <SelectItem key={optValue} value={optValue}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>

    <Field orientation='responsive'>
      <FieldContent>
        <FieldLabel>Тема</FieldLabel>
      </FieldContent>

      <ThemeToggle className='min-w-[150px]' />
    </Field>
  </FieldGroup>
)
