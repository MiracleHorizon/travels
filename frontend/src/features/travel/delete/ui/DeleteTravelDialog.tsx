import { useTranslation } from 'react-i18next'
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
import { ModalDefinition, useHideModal } from '@/shared/lib/modal'

interface DeleteTravelDialogProps {
  travelId: string
  travelName: string
}

const DeleteTravelDialog = ({ travelId, travelName }: DeleteTravelDialogProps) => {
  const { t } = useTranslation()
  const { isPending, deleteTravel } = useDeleteTravel(travelId)
  const hideModal = useHideModal()

  return (
    <AlertDialog open>
      <AlertDialogContent size='sm'>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('form.travel.deleteConfirm')}</AlertDialogTitle>

          <AlertDialogDescription>
            {t('form.travel.deleteDescription', { name: travelName })}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} onClick={hideModal}>
            {t('form.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction variant='destructive' onClick={deleteTravel} disabled={isPending}>
            {t('form.delete')}
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
