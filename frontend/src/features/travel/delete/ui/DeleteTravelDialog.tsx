import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/shared/ui/alert-dialog'
import { useDeleteTravel } from '../model/useDeleteTravel'
import { ModalDefinition } from '@/shared/lib/modal'

interface DeleteTravelDialogProps {
  travelId: string
  travelName: string
}

const DeleteTravelDialog = ({ travelId, travelName }: DeleteTravelDialogProps) => {
  const { isLoading, deleteTravel } = useDeleteTravel(travelId)

  return (
    <AlertDialog open>
      <AlertDialogContent size='sm'>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить путешествие?</AlertDialogTitle>

          <AlertDialogDescription>
            Вы уверены, что хотите удалить путешествие <strong>«{travelName}»</strong>?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Отмена</AlertDialogCancel>
          <AlertDialogAction variant='destructive' onClick={deleteTravel} disabled={isLoading}>
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export const deleteTravelModalDefinition: ModalDefinition = {
  name: 'DeleteTravelDialog',
  component: DeleteTravelDialog
}
