import { useTranslation } from 'react-i18next'
import { Button, Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from '@/shared/ui'
import { Plus } from 'lucide-react'

interface ExpensesListEmptyProps {
  onAddExpense: () => void
}

export const ExpensesListEmpty = ({ onAddExpense }: ExpensesListEmptyProps) => {
  const { t } = useTranslation()

  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>{t('travelPage.noExpenses')}</EmptyTitle>
        <EmptyDescription>{t('travelPage.noExpensesDescription')}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant='outline' onClick={onAddExpense}>
          <Plus />
          {t('travelPage.trackExpenses')}
        </Button>
      </EmptyContent>
    </Empty>
  )
}
