import { useTranslation } from 'react-i18next'
import { formatFileSize } from '@/shared/lib/file'
import { Field, FieldContent, FieldLabel, FieldDescription, Input, FileDropzone } from '@/shared/ui'
import { DropzoneOptions, useDropzone } from 'react-dropzone'

interface TravelPhotoUploadFormData {
  photo: File | null
  description: string
}

interface TravelPhotoUploadFormProps {
  value: TravelPhotoUploadFormData
  onChange: (value: TravelPhotoUploadFormData) => void
  dropzoneOptions: DropzoneOptions
  maxFileSize: number
}

export const TravelPhotoUploadForm = ({
  value,
  onChange,
  dropzoneOptions,
  maxFileSize
}: TravelPhotoUploadFormProps) => {
  const { t } = useTranslation()
  const { getRootProps, getInputProps, isDragActive } = useDropzone(dropzoneOptions)

  return (
    <form className='space-y-4' onSubmit={ev => ev.preventDefault()}>
      <Field>
        <FieldContent>
          <FieldLabel htmlFor='description'>{t('upload.formName')}</FieldLabel>
          <Input
            required
            id='description'
            type='text'
            autoComplete='off'
            placeholder={t('upload.formNamePlaceholder')}
            value={value.description}
            onChange={ev => onChange({ ...value, description: ev.target.value })}
          />
          <FieldDescription>{t('upload.formNameHint')}</FieldDescription>
        </FieldContent>
      </Field>

      <Field>
        <FieldContent>
          <FieldLabel htmlFor='photo'>{t('upload.formPhoto')}</FieldLabel>
          <FileDropzone
            inputId='photo'
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            isDragActive={isDragActive}
            dragLabel={t('upload.dragLabel')}
            selectLabel={t('upload.selectLabel')}
            hint={t('upload.hintFormat', { maxSize: formatFileSize(maxFileSize) })}
          />
        </FieldContent>
      </Field>
    </form>
  )
}
