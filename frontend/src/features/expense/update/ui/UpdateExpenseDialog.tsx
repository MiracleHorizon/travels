import { useTranslation } from 'react-i18next'
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
import { ModalDefinition, useHideModal } from '@/shared/lib/modal'
import { useUpdateExpense } from '../model/useUpdateExpense'
import { ExpenseForm, Expense } from '@/entities/expense'
import { useSettings } from '@/features/settings'

interface UpdateExpenseDialogProps {
  expense: Expense
}

const UpdateExpenseDialog = ({ expense }: UpdateExpenseDialogProps) => {
  const { t } = useTranslation()

  const { getSetting } = useSettings()
  const locale = getSetting('locale')

  const { isPending, formFields, setFormFields, updateExpense } = useUpdateExpense({
    expense
  })
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
          <DialogTitle>{t('form.expense.editTitle')}</DialogTitle>
          <DialogDescription>{t('form.expense.editDescription')}</DialogDescription>
        </DialogHeader>

        <ExpenseForm
          values={formFields}
          disabled={isPending}
          locale={locale}
          onChange={setFormFields}
          onSubmit={updateExpense}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button size='sm' variant='secondary' disabled={isPending}>
              {t('form.cancel')}
            </Button>
          </DialogClose>

          <Button size='sm' onClick={updateExpense} isLoading={isPending}>
            {t('form.save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const updateExpenseModalDefinition: ModalDefinition<UpdateExpenseDialogProps> = {
  name: 'UpdateExpenseModal',
  component: UpdateExpenseDialog
}
