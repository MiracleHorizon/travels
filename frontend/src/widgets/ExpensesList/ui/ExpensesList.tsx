import {
  useExpensesQuery,
  ExpenseBarChart,
  ExpenseCard,
  ExpenseCategorySection
} from '@/entities/expense'
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
  EmptyDescription,
  Separator,
  TooltipComposer
} from '@/shared/ui'
import { Plus, RefreshCcw } from 'lucide-react'
import { ExpensesListEmpty } from './ExpensesListEmpty'
import { useExpenseActions } from '../model/useExpenseActions'
import { useExpensesByCategory } from '../model/useExpensesByCategory'
import { formatCurrency } from '@/shared/lib/format'
import { useCreateExpenseAction } from '@/features/expense/create'

interface ExpensesListProps {
  travelId: string
}

const locale = 'ru-RU'
// TODO: Выбор валюты
const currency = 'RUB'

export const ExpensesList = ({ travelId }: ExpensesListProps) => {
  const { data: expenses, isLoading, isSuccess, error, refetch } = useExpensesQuery({ travelId })
  const { groups, categoriesWithExpenses } = useExpensesByCategory({ expenses })

  const { createExpense } = useCreateExpenseAction({ travelId })
  const actions = useExpenseActions({ travelId })

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

  const isEmpty = isSuccess && expenses && expenses.length === 0
  const total =
    expenses && expenses.length > 0
      ? expenses.reduce((total, expense) => total + +expense.amount, 0)
      : 0

  return (
    <Card>
      <CardContent className='group'>
        <div className='flex justify-between items-center'>
          <CardTitle className='text-lg'>Расходы</CardTitle>

          <TooltipComposer content='Добавить расход'>
            <Button
              size='icon-sm'
              variant='outline'
              className='opacity-0 group-hover:opacity-100 transition-opacity'
              onClick={createExpense}
            >
              <Plus />
            </Button>
          </TooltipComposer>
        </div>

        {isEmpty ? (
          <ExpensesListEmpty onAddExpense={createExpense} />
        ) : (
          <div className='flex flex-col'>
            <ExpenseBarChart expenses={expenses} className='mt-4' />

            <Separator className='mt-4' />

            <div className='space-y-1 my-4 -mx-1'>
              {categoriesWithExpenses.map((category, index) => (
                <ExpenseCategorySection
                  key={category}
                  locale={locale}
                  category={category}
                  currency={currency}
                  expenses={groups.get(category)}
                  defaultOpen={index === 0}
                  renderItem={expense => (
                    <ExpenseCard
                      {...expense}
                      size='sm'
                      locale={locale}
                      actions={actions(expense)}
                    />
                  )}
                />
              ))}
            </div>

            <div className='pt-6 border-t'>
              <TotalAmount amount={formatCurrency(total, currency)} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
