import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Field,
  FieldContent,
  FieldLabel,
  Input,
  Textarea,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/shared/ui'
import { ModalDefinition, useHideModal } from '@/shared/lib/modal'
import { useCreateExpense } from '../model/useCreateExpense'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { ru as ruDateFns } from 'date-fns/locale'
import { ru as ruDayPicker } from 'react-day-picker/locale'
import { cn } from '@/shared/lib/styles/utils'
import { ExpenseCategorySelect } from '@/entities/expense'

interface CreateExpenseDialogProps {
  travelId: string
}

const CreateExpenseDialog = ({ travelId }: CreateExpenseDialogProps) => {
  const { isLoading, formFields, setFormFields, createExpense } = useCreateExpense({
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

        <div className='space-y-4 mt-2'>
          <Field>
            <FieldContent>
              <FieldLabel htmlFor='title'>Название</FieldLabel>
              <Input
                id='title'
                type='text'
                placeholder='Обед в кафе'
                autoComplete='off'
                value={formFields.title}
                onChange={ev => setFormFields({ ...formFields, title: ev.target.value })}
                disabled={isLoading}
              />
            </FieldContent>
          </Field>

          <div className='grid grid-cols-2 gap-4'>
            <Field>
              <FieldContent>
                <FieldLabel htmlFor='amount'>Сумма</FieldLabel>
                <Input
                  id='amount'
                  type='number'
                  placeholder='156$'
                  value={formFields.amount}
                  onChange={ev => setFormFields({ ...formFields, amount: ev.target.value })}
                  disabled={isLoading}
                  step='1'
                  min='0'
                />
              </FieldContent>
            </Field>

            <Field>
              <FieldContent>
                <FieldLabel htmlFor='category'>Категория</FieldLabel>
                <ExpenseCategorySelect
                  id='category'
                  value={formFields.category}
                  onChange={category => setFormFields({ ...formFields, category })}
                  disabled={isLoading}
                />
              </FieldContent>
            </Field>
          </div>

          <Field>
            <FieldContent>
              <FieldLabel htmlFor='date'>Дата</FieldLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id='date'
                    variant='outline'
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !formFields.date && 'text-muted-foreground'
                    )}
                    disabled={isLoading}
                  >
                    <CalendarIcon className='h-4 w-4' />
                    {formFields.date ? (
                      format(formFields.date, 'PPP', { locale: ruDateFns })
                    ) : (
                      <span>Выберите дату</span>
                    )}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={formFields.date}
                    onSelect={date => setFormFields({ ...formFields, date })}
                    locale={ruDayPicker}
                  />
                </PopoverContent>
              </Popover>
            </FieldContent>
          </Field>

          <Field>
            <FieldContent>
              <FieldLabel htmlFor='description'>Описание</FieldLabel>
              <Textarea
                id='description'
                placeholder='Расскажите, чем была вызвана эта трата и стоила ли она того?'
                value={formFields.description}
                onChange={ev => setFormFields({ ...formFields, description: ev.target.value })}
                disabled={isLoading}
                rows={3}
              />
            </FieldContent>
          </Field>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button size='sm' variant='secondary' disabled={isLoading}>
              Отмена
            </Button>
          </DialogClose>

          <Button size='sm' onClick={createExpense} isLoading={isLoading}>
            Добавить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const createExpenseModalDefinition: ModalDefinition<CreateExpenseDialogProps> = {
  name: 'createExpenseModal',
  component: CreateExpenseDialog
}
