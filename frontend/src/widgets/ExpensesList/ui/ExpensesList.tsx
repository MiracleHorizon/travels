import { ExpenseCard, useExpensesQuery } from '@/entities/expense'
import {
  Card,
  CardContent,
  CardTitle,
  Spinner,
  Button,
  TotalAmount,
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyDescription
} from '@/shared/ui'
import { Plus, RefreshCcw } from 'lucide-react'
import { ExpensesListEmpty } from './ExpensesListEmpty'
import { useExpenseActions } from '../model/useExpenseActions'
import { formatCurrency } from '@/shared/lib/format'
import { useCreateExpenseAction } from '@/features/expense/create'

interface ExpensesListProps {
  travelId: string
}

const locale = 'ru-RU'
// TODO: Выбор валюты
const currency = 'RUB'

export const ExpensesList = ({ travelId }: ExpensesListProps) => {
  const { data: expenses, isLoading, error, refetch } = useExpensesQuery({ travelId })

  const { createExpense } = useCreateExpenseAction({ travelId })
  const actions = useExpenseActions()

  if (isLoading) {
    return (
      <Card>
        <CardContent className='flex justify-center items-center py-8'>
          <Spinner className='h-8 w-8' />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className='p-0'>
        <Empty>
          <EmptyHeader>
            <EmptyDescription className='text-md'>Не удалось загрузить расходы</EmptyDescription>
          </EmptyHeader>
          <EmptyContent className='flex-row justify-center gap-2'>
            <Button variant='outline' size='sm' onClick={() => refetch()}>
              <RefreshCcw />
              Попробовать снова
            </Button>
          </EmptyContent>
        </Empty>
      </Card>
    )
  }

  const total =
    expenses && expenses.length > 0
      ? expenses.reduce((total, expense) => total + +expense.amount, 0)
      : 0

  return (
    <Card>
      <CardContent className='space-y-8'>
        <div className='flex justify-between items-center'>
          <CardTitle className='text-xl font-semibold'>Расходы</CardTitle>

          <Button onClick={createExpense} size='sm'>
            <Plus />
            Добавить
          </Button>
        </div>

        {expenses && expenses.length > 0 ? (
          <>
            <div className='space-y-4'>
              {expenses.map(expense => (
                <ExpenseCard
                  {...expense}
                  key={expense.id}
                  actions={actions(expense.id)}
                  locale={locale}
                  size='sm'
                />
              ))}
            </div>

            <div className='pt-4 border-t'>
              <TotalAmount amount={formatCurrency(total, currency)} />
            </div>
          </>
        ) : (
          <ExpensesListEmpty onAddExpense={createExpense} />
        )}
      </CardContent>
    </Card>
  )
}
