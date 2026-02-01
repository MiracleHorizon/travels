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
import { TravelForm } from '@/entities/travel'
import { ModalDefinition, useHideModal } from '@/shared/lib'
import { useCreateTravel } from '../model/useCreateTravel'

const CreateTravelDialog = () => {
  const { isLoading, error, formData, setFormData, createTravel } = useCreateTravel()
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
          <DialogTitle>Новое путешествие</DialogTitle>
          <DialogDescription>
            Спланируйте незабываемое путешествие или сохраните память о прошедшем
          </DialogDescription>
        </DialogHeader>

        <TravelForm
          value={formData}
          error={error}
          disabled={isLoading}
          onChange={setFormData}
          onSubmit={createTravel}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button size='sm' variant='secondary' disabled={isLoading}>
              Отмена
            </Button>
          </DialogClose>

          <Button size='sm' onClick={createTravel} isLoading={isLoading}>
            Создать
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const createTravelModalDefinition: ModalDefinition = {
  name: 'createTravelModal',
  component: CreateTravelDialog
}
