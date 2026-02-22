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
import { EXPENSE_CHART_COLORS } from '../model/consts'
import { useBarExpenses } from '../model/useBarExpenses'
import { formatCurrency } from '@/shared/lib/format'
import { cn } from '@/shared/lib'
import { AppLocale } from '@/shared/lib/i18n'
import type { Expense } from '../model/types'

interface ExpenseBarChartProps {
  expenses: Expense[]
  className?: string
  locale: AppLocale
}

export const ExpenseBarChart = ({ expenses, className, locale }: ExpenseBarChartProps) => {
  const { t } = useTranslation()

  const chartData = useBarExpenses({
    expenses,
    locale
  })

  const chartConfig = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(EXPENSE_CHART_COLORS).map(([key, color]) => [
          key,
          {
            label: t(`form.expense.categories.${key}`),
            color
          }
        ])
      ),
    [t]
  )

  if (chartData.length <= 1) {
    return null
  }

  return (
    <div className={cn('flex flex-col w-full', className)}>
      <ChartContainer config={chartConfig} className='min-h-[250px] h-[250px] w-full'>
        <BarChart data={chartData}>
          <XAxis dataKey='dayLabel' tickLine={true} axisLine={true} />

          <ChartTooltip content={<CustomTooltip locale={locale} />} />
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

const CustomTooltip = ({
  locale,
  ...props
}: TooltipProps<number, string> & {
  locale: AppLocale
}) => {
  const payload = !props.payload
    ? []
    : props.payload
        .filter(category => category.value && category.value > 0)
        .map(category => ({
          ...category,
          value: formatCurrency({
            amount: category.value,
            currency: 'RUB',
            locale
          })
        }))

  // @ts-expect-error - проблема типизация тултипа.
  return <ChartTooltipContent {...props} payload={payload} hideLabel />
}
