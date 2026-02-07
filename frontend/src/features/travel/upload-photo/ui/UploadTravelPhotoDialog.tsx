import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  FilePreviewItem
} from '@/shared/ui'
import { TravelPhotoUploadForm } from '@/entities/travel'
import { ModalDefinition, useHideModal } from '@/shared/lib/modal'
import { useUploadTravelPhotos } from '../model/useUploadTravelPhotos'
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE, MAX_FILES_COUNT } from '../model/consts'
import { useState } from 'react'

interface UploadTravelPhotoDialogProps {
  travelId: string
}

const UploadTravelPhotoDialog = ({ travelId }: UploadTravelPhotoDialogProps) => {
  const hideModal = useHideModal()

  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const { isLoading, formFields, uploadTravelPhotos, setFormFields } = useUploadTravelPhotos({
    travelId
  })

  const handleUpload = () => {
    uploadTravelPhotos({
      photo: formFields.photo!,
      description: formFields.description
    })
  }

  const handleDropFile = (acceptedFiles: File[]) => {
    let file: File | null = null
    if (acceptedFiles.length > 0) {
      file = acceptedFiles[0]
    }

    setFormFields(prevState => ({
      ...prevState,
      photo: file
    }))
    setPreviewUrl(URL.createObjectURL(file))
  }

  const handleRemoveFile = () => {
    setPreviewUrl(null)
    setFormFields(prevState => ({
      ...prevState,
      photo: null
    }))
  }

  return (
    <Dialog
      open
      onOpenChange={open => {
        if (!open) {
          hideModal()
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Загрузка фотографии</DialogTitle>
          <DialogDescription>Добавьте воспоминание к вашему путешествию</DialogDescription>
        </DialogHeader>

        <TravelPhotoUploadForm
          value={formFields}
          maxFileSize={MAX_FILE_SIZE}
          onChange={setFormFields}
          dropzoneOptions={{
            accept: {
              'image/*': ACCEPTED_FILE_TYPES
            },
            maxFiles: MAX_FILES_COUNT,
            maxSize: MAX_FILE_SIZE,
            onDrop: handleDropFile
          }}
        />

        {formFields.photo && previewUrl && (
          <FilePreviewItem
            file={formFields.photo}
            previewUrl={previewUrl}
            onRemove={handleRemoveFile}
          />
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button size='sm' variant='secondary'>
              Отмена
            </Button>
          </DialogClose>

          <Button
            size='sm'
            onClick={handleUpload}
            // TODO: Валидация формы
            disabled={!formFields.photo || isLoading}
            isLoading={isLoading}
          >
            Загрузить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const uploadTravelPhotoModalDefinition: ModalDefinition<UploadTravelPhotoDialogProps> = {
  name: 'UploadTravelPhotoModal',
  component: UploadTravelPhotoDialog
}
