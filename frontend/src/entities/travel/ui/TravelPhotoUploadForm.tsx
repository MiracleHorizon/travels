import { formatFileSize } from '@/shared/lib/file'
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldDescription,
  Input,
  FilePreviewItem,
  FileDropzone
} from '@/shared/ui'
import { DropzoneOptions, useDropzone } from 'react-dropzone'

interface TravelPhotoUploadFormData {
  photo: File | null
  photoName: string
  previewUrl: string | null
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
          <FieldLabel htmlFor='photoName'>Название</FieldLabel>
          <Input
            required
            id='photoName'
            type='text'
            autoComplete='off'
            placeholder='Эйфелева башня, Париж'
            value={value.photoName}
            onChange={ev => onChange({ ...value, photoName: ev.target.value })}
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

      {value.photo && value.previewUrl && (
        <FilePreviewItem
          file={value.photo}
          previewUrl={value.previewUrl}
          onRemove={() => onChange({ photoName: '', photo: null, previewUrl: null })}
        />
      )}
    </form>
  )
}
