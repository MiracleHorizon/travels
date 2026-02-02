import { ExpenseCard, useExpensesQuery } from '@/entities/expense'
import {
  Card,
  CardContent,
  CardTitle,
  Spinner,
  Button,
  CardDescription,
  TotalAmount
} from '@/shared/ui'
import { Plus } from 'lucide-react'
import { ExpensesListEmpty } from './ExpensesListEmpty'
import { useExpenseActions } from '../model/useExpenseActions'
import { formatCurrency } from '@/shared/lib/format'

interface ExpensesListProps {
  travelId: string
}

const locale = 'ru-RU'
// TODO: Выбор валюты
const currency = 'RUB'

export const ExpensesList = ({ travelId }: ExpensesListProps) => {
  const { data: expenses, isLoading, error } = useExpensesQuery(travelId)
  const actions = useExpenseActions()

  // TODO: Добавить функцию добавления расхода
  const addExpense = () => {}

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
      <Card>
        <CardContent className='py-8'>
          <CardDescription className='text-center'>Не удалось загрузить расходы</CardDescription>
        </CardContent>
      </Card>
    )
  }

  const total =
    expenses && expenses.length > 0
      ? expenses.reduce((total, expense) => total + expense.amount, 0)
      : 0

  return (
    <Card>
      <CardContent className='space-y-8'>
        <div className='flex justify-between items-center'>
          <CardTitle className='text-xl font-semibold'>Расходы</CardTitle>

          <Button onClick={addExpense} size='sm'>
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
          <ExpensesListEmpty />
        )}
      </CardContent>
    </Card>
  )
}
