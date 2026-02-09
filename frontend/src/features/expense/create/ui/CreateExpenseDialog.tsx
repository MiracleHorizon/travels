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
import { useCreateExpense } from '../model/useCreateExpense'
import { ExpenseForm } from '@/entities/expense'

interface CreateExpenseDialogProps {
  travelId: string
}

const CreateExpenseDialog = ({ travelId }: CreateExpenseDialogProps) => {
  const { isPending, formFields, setFormFields, createExpense } = useCreateExpense({
    travelId
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
          <DialogTitle>Добавление расхода</DialogTitle>
          <DialogDescription>
            Укажите сумму и описание расхода для учета в путешествии
          </DialogDescription>
        </DialogHeader>

        <ExpenseForm
          values={formFields}
          disabled={isPending}
          onChange={setFormFields}
          onSubmit={createExpense}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button size='sm' variant='secondary' disabled={isPending}>
              Отмена
            </Button>
          </DialogClose>

          <Button size='sm' onClick={createExpense} isLoading={isPending}>
            Добавить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const createExpenseModalDefinition: ModalDefinition<CreateExpenseDialogProps> = {
  name: 'СreateExpenseModal',
  component: CreateExpenseDialog
}
