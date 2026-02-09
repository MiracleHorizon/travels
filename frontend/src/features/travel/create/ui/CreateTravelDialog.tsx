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
import { ModalDefinition, useHideModal } from '@/shared/lib/modal'
import { useCreateTravel } from '../model/useCreateTravel'

const CreateTravelDialog = () => {
  const { isPending, formFields, setFormFields, createTravel } = useCreateTravel()

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
          values={formFields}
          disabled={isPending}
          onChange={setFormFields}
          onSubmit={createTravel}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button size='sm' variant='secondary' disabled={isPending}>
              Отмена
            </Button>
          </DialogClose>

          <Button size='sm' onClick={createTravel} isLoading={isPending}>
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
