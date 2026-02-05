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
import { useDeleteExpense } from '../model/useDeleteExpense'
import { ModalDefinition, useHideModal } from '@/shared/lib/modal'

interface DeleteExpenseDialogProps {
  travelId: string
  expenseId: string
  expenseTitle: string
}

const DeleteExpenseDialog = ({ travelId, expenseId, expenseTitle }: DeleteExpenseDialogProps) => {
  const { isLoading, deleteExpense } = useDeleteExpense(travelId, expenseId)
  const hideModal = useHideModal()

  return (
    <AlertDialog open>
      <AlertDialogContent size='sm'>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить расход?</AlertDialogTitle>

          <AlertDialogDescription>
            Вы уверены, что хотите удалить расход <strong>«{expenseTitle}»</strong>?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading} onClick={hideModal}>
            Отмена
          </AlertDialogCancel>
          <AlertDialogAction variant='destructive' onClick={deleteExpense} disabled={isLoading}>
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export const deleteExpenseModalDefinition: ModalDefinition = {
  name: 'DeleteExpenseDialog',
  component: DeleteExpenseDialog
}
