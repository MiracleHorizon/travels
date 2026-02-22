import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
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
import type { Expense, ExpenseCategory } from '../model/types'
import { formatCurrency } from '@/shared/lib/format'
import { cn } from '@/shared/lib/styles/utils'

interface ExpenseBarChartProps {
  expenses: Expense[]
  className?: string
}

export const ExpenseBarChart = ({ expenses, className }: ExpenseBarChartProps) => {
  const { t } = useTranslation()
  const chartConfig = useMemo(
    () =>
      Object.fromEntries(
        (
          Object.entries(EXPENSE_CHART_CATEGORIES) as [
            ExpenseCategory,
            { label: string; color: string }
          ][]
        ).map(([key, { color }]) => [key, { label: t(`form.expense.categories.${key}`), color }])
      ),
    [t]
  )
  const chartData = useBarExpenses(expenses)

  if (chartData.length <= 1) {
    return null
  }

  return (
    <div className={cn('flex flex-col w-full', className)}>
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
  const payload = !props.payload
    ? []
    : props.payload
        .filter(category => category.value && category.value > 0)
        .map(category => ({
          ...category,
          value: formatCurrency(category.value, 'RUB')
        }))

  // @ts-expect-error - проблема типизация тултипа.
  return <ChartTooltipContent {...props} payload={payload} hideLabel />
}
