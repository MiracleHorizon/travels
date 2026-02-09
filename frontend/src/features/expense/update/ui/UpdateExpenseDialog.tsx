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

interface UpdateExpenseDialogProps {
  expense: Expense
}

const UpdateExpenseDialog = ({ expense }: UpdateExpenseDialogProps) => {
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
          <DialogTitle>Редактирование расхода</DialogTitle>
          <DialogDescription>Измените детали</DialogDescription>
        </DialogHeader>

        <ExpenseForm
          values={formFields}
          disabled={isPending}
          onChange={setFormFields}
          onSubmit={updateExpense}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button size='sm' variant='secondary' disabled={isPending}>
              Отмена
            </Button>
          </DialogClose>

          <Button size='sm' onClick={updateExpense} isLoading={isPending}>
            Сохранить
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
