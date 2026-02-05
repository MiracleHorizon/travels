import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/shared/ui/chart'
import { Label as ChartLabel, Pie, PieChart } from 'recharts'
import { useMemo } from 'react'
import { formatCurrency } from '@/shared/lib/format'
import { usePieExpenses } from '../model/usePieExpenses'
import type { Expense } from '../model/types'
import { EXPENSE_CHART_CATEGORIES } from '../model/consts'

interface ExpensePieChartProps {
  expenses: Expense[]
}

const chartConfig = {
  amount: {
    label: 'Сумма'
  },
  ...EXPENSE_CHART_CATEGORIES
} as const satisfies ChartConfig

// TODO: Подумать куда пристроить.
export const ExpensePieChart = ({ expenses }: ExpensePieChartProps) => {
  const chartData = usePieExpenses(expenses)

  const totalAmount = useMemo(() => {
    return chartData.reduce((acc, item) => acc + item.amount, 0)
  }, [chartData])

  if (chartData.length === 0) {
    return null
  }

  return (
    <ChartContainer
      config={chartConfig}
      className='aspect-square max-h-[250px] h-[250px] w-[250px]'
    >
      <PieChart>
        <ChartTooltip cursor={true} content={<ChartTooltipContent hideLabel indicator='dot' />} />
        <Pie
          isAnimationActive={false}
          data={chartData}
          dataKey='amount'
          nameKey='category'
          innerRadius={74}
        >
          <ChartLabel
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className='fill-foreground text-xl font-bold'
                    >
                      {formatCurrency(totalAmount, 'RUB')}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className='fill-muted-foreground'
                    >
                      Расходы за поездку
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}
