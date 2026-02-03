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
import { TravelForm, Travel } from '@/entities/travel'
import { ModalDefinition, useHideModal } from '@/shared/lib/modal'
import { useUpdateTravel } from '../model/useUpdateTravel'

interface UpdateTravelDialogProps {
  travel: Travel
}

const UpdateTravelDialog = ({ travel }: UpdateTravelDialogProps) => {
  const { isLoading, formFields, setFormFields, updateTravel } = useUpdateTravel({ travel })

  const hideModal = useHideModal()

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
          <DialogTitle>Редактирование путешествия</DialogTitle>
          <DialogDescription>Измените детали путешествия</DialogDescription>
        </DialogHeader>

        <TravelForm
          value={formFields}
          disabled={isLoading}
          onChange={setFormFields}
          onSubmit={updateTravel}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button size='sm' variant='secondary' disabled={isLoading}>
              Отмена
            </Button>
          </DialogClose>

          <Button size='sm' onClick={updateTravel} isLoading={isLoading}>
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const updateTravelModalDefinition: ModalDefinition = {
  name: 'updateTravelModal',
  component: UpdateTravelDialog
}
