import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/shared/ui'
import { TravelPhotoUploadForm } from '@/entities/travel'
import { ModalDefinition, useHideModal } from '@/shared/lib/modal'
import { useUploadTravelPhotos } from '../model/useUploadTravelPhotos'
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE, MAX_FILES_COUNT } from '../model/consts'

interface UploadTravelPhotoDialogProps {
  travelId: string
}

const UploadTravelPhotoDialog = ({ travelId }: UploadTravelPhotoDialogProps) => {
  const hideModal = useHideModal()

  const { isLoading, formFields, uploadTravelPhotos, setFormFields } = useUploadTravelPhotos({
    travelId
  })

  return (
    <Dialog
      open
      onOpenChange={open => {
        if (!open) {
          hideModal()
        }
      }}
    >
      <DialogContent className='max-w-lg'>
        <DialogHeader>
          <DialogTitle>Загрузка фотографии</DialogTitle>
          <DialogDescription>Добавьте воспоминание к вашему путешествию</DialogDescription>
        </DialogHeader>

        <TravelPhotoUploadForm
          value={formFields}
          maxFileSize={MAX_FILE_SIZE}
          onChange={setFormFields}
          dropzoneOptions={{
            onDrop: acceptedFiles => {
              if (acceptedFiles.length > 0) {
                const firstFile = acceptedFiles[0]

                setFormFields(prevState => ({
                  ...prevState,
                  photo: firstFile,
                  previewUrl: URL.createObjectURL(firstFile)
                }))
              }
            },
            accept: {
              'image/*': ACCEPTED_FILE_TYPES
            },
            maxFiles: MAX_FILES_COUNT,
            maxSize: MAX_FILE_SIZE
          }}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button size='sm' variant='secondary' disabled={isLoading}>
              Отмена
            </Button>
          </DialogClose>

          <Button
            size='sm'
            onClick={() =>
              uploadTravelPhotos({
                photo: formFields.photo!,
                photoName: formFields.photoName
              })
            }
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
