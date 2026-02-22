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
import { useDeleteExpense } from '../model/useDeleteExpense'
import { ModalDefinition, useHideModal } from '@/shared/lib/modal'

interface DeleteExpenseDialogProps {
  travelId: string
  expenseId: string
  expenseTitle: string
}

const DeleteExpenseDialog = ({ travelId, expenseId, expenseTitle }: DeleteExpenseDialogProps) => {
  const { t } = useTranslation()
  const { isPending, deleteExpense } = useDeleteExpense(travelId, expenseId)
  const hideModal = useHideModal()

  return (
    <AlertDialog open>
      <AlertDialogContent size='sm'>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('form.expense.deleteConfirm')}</AlertDialogTitle>

          <AlertDialogDescription>
            {t('form.expense.deleteDescription', { name: expenseTitle })}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} onClick={hideModal}>
            {t('form.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction variant='destructive' onClick={deleteExpense} disabled={isPending}>
            {t('form.delete')}
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
