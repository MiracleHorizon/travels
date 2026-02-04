import { Button, Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from '@/shared/ui'
import { Plus } from 'lucide-react'

interface ExpensesListEmptyProps {
  onAddExpense: () => void
}

export const ExpensesListEmpty = ({ onAddExpense }: ExpensesListEmptyProps) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>Пока расходов нет</EmptyTitle>
        <EmptyDescription>
          Добавьте информацию о них, чтобы узнать, сколько вы потратили на путешествие
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant='outline' onClick={onAddExpense}>
          <Plus />
          Учесть расходы
        </Button>
      </EmptyContent>
    </Empty>
  )
}
