import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Loader
} from '@/shared/ui'
import { useTravelQuery } from '@/entities/travel'
import { ModalDefinition, useHideModal } from '@/shared/lib/modal'
import { UpdateTravelForm } from './UpdateTravelForm'

interface UpdateTravelDialogProps {
  travelId: string
}

const UpdateTravelDialog = ({ travelId }: UpdateTravelDialogProps) => {
  const { data: travel, isLoading } = useTravelQuery(travelId)
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

        {/* TODO: Скелетон формы */}
        {!travel || isLoading ? <Loader /> : <UpdateTravelForm travel={travel} />}
      </DialogContent>
    </Dialog>
  )
}

export const updateTravelModalDefinition: ModalDefinition<UpdateTravelDialogProps> = {
  name: 'UpdateTravelModal',
  component: UpdateTravelDialog
}
