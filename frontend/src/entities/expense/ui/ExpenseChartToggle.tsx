import { ToggleGroup, ToggleGroupItem } from '@/shared/ui'
import { BarChart3, PieChart } from 'lucide-react'
import { memo } from 'react'

interface ExpenseChartToggleProps {
  selected: ExpenseChartType
  onSelect: (type: ExpenseChartType) => void
  className?: string
}

export const enum ExpenseChartType {
  PIE = 'pie',
  BAR = 'bar'
}

const chartTypes = [
  {
    value: ExpenseChartType.PIE,
    Icon: PieChart
  },
  {
    value: ExpenseChartType.BAR,
    Icon: BarChart3
  }
] as const

// TODO: Подумать куда пристроить.
export const ExpenseChartToggle = memo(
  ({ selected, onSelect, className }: ExpenseChartToggleProps) => (
    <ToggleGroup
      size='sm'
      type='single'
      variant='outline'
      className={className}
      value={selected}
      onValueChange={onSelect}
    >
      {chartTypes.map(({ value, Icon }) => (
        <ToggleGroupItem key={value} value={value}>
          <Icon />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
)
