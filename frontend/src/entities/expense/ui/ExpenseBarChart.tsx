import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@/shared/ui/chart'
import { Bar, BarChart, XAxis } from 'recharts'
import type { TooltipProps } from 'recharts'
import { EXPENSE_CHART_CATEGORIES } from '../model/consts'
import { useBarExpenses } from '../model/useBarExpenses'
import type { Expense } from '../model/types'
import { formatCurrency } from '@/shared/lib/format'
import { useMemo } from 'react'

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
          <XAxis dataKey='dayLabel' tickLine={true} axisLine={true} />

          <ChartTooltip content={<CustomTooltip />} />
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

const CustomTooltip = (props: TooltipProps<number, string>) => {
  const payload = useMemo(() => {
    if (!props.payload) {
      return []
    }

    return (
      props.payload
        // Отображаем только категории с суммой больше 0.
        .filter(category => category.value && category.value > 0)
        // Добавляем форматирование суммы с отображением символа валюты.
        .map(category => ({
          ...category,
          value: formatCurrency(category.value, 'RUB')
        }))
    )
  }, [props.payload])

  // @ts-expect-error - проблема типизация тултипа.
  return <ChartTooltipContent {...props} payload={payload} hideLabel />
}
