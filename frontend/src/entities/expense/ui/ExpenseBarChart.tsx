import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@/shared/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { EXPENSE_CHART_CATEGORIES } from '../model/consts'
import { useBarExpenses } from '../model/useBarExpenses'
import type { Expense } from '../model/types'

interface ExpenseBarChartProps {
  expenses: Expense[]
}

const chartConfig = EXPENSE_CHART_CATEGORIES

export const ExpenseBarChart = ({ expenses }: ExpenseBarChartProps) => {
  const chartData = useBarExpenses(expenses)

  if (chartData.length === 0) {
    return null
  }

  return (
    <div className='flex flex-col w-full'>
      <ChartContainer config={chartConfig} className='min-h-[250px] h-[250px] w-full'>
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey='dayLabel'
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={value => value.split('\n')[0]}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey='transport'
            stackId='a'
            fill='var(--color-transport)'
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey='accommodation'
            stackId='a'
            fill='var(--color-accommodation)'
            radius={[0, 0, 0, 0]}
          />
          <Bar dataKey='food' stackId='a' fill='var(--color-food)' radius={[0, 0, 0, 0]} />
          <Bar
            dataKey='entertainment'
            stackId='a'
            fill='var(--color-entertainment)'
            radius={[0, 0, 0, 0]}
          />
          <Bar dataKey='shopping' stackId='a' fill='var(--color-shopping)' radius={[0, 0, 0, 0]} />
          <Bar dataKey='other' stackId='a' fill='var(--color-other)' radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
