import { Button, Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from '@/shared/ui'
import { Plus } from 'lucide-react'

export const ExpensesListEmpty = () => {
  // TODO: Добавить функцию добавления расхода
  const addExpense = () => {}

  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>Пока расходов нет</EmptyTitle>
        <EmptyDescription>
          Добавьте информацию о них, чтобы узнать, сколько вы потратили на путешествие
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant='outline' onClick={addExpense}>
          <Plus />
          Учесть расходы
        </Button>
      </EmptyContent>
    </Empty>
  )
}
