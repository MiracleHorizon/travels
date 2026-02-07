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
  const { getRootProps, getInputProps, isDragActive } = useDropzone(dropzoneOptions)

  return (
    <form className='space-y-4' onSubmit={ev => ev.preventDefault()}>
      <Field>
        <FieldContent>
          <FieldLabel htmlFor='description'>Название</FieldLabel>
          <Input
            required
            id='description'
            type='text'
            autoComplete='off'
            placeholder='Эйфелева башня, Париж'
            value={value.description}
            onChange={ev => onChange({ ...value, description: ev.target.value })}
          />
          <FieldDescription>
            Название будет использоваться как подпись к фотографии
          </FieldDescription>
        </FieldContent>
      </Field>

      <Field>
        <FieldContent>
          <FieldLabel htmlFor='photo'>Фотография</FieldLabel>
          <FileDropzone
            inputId='photo'
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            isDragActive={isDragActive}
            dragLabel='Перетащите фотографию или'
            selectLabel='выберите файл'
            hint={`PNG, JPG, WEBP до ${formatFileSize(maxFileSize)}`}
          />
        </FieldContent>
      </Field>
    </form>
  )
}
