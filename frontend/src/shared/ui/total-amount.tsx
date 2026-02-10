import { cn } from '@/shared/lib/styles/utils'

interface CurrencyAmount {
  currency: string
  amount: string
}

interface TotalAmountProps {
  label?: string
  amount?: string
  amounts?: CurrencyAmount[]
  className?: string
}

export const TotalAmount = ({ label = 'Итого:', amount, amounts, className }: TotalAmountProps) => {
  const isMultiCurrency = amounts && amounts.length > 1

  return (
    <div className={cn('flex justify-between items-start gap-4', className)}>
      <span className='text-lg font-medium'>{label}</span>

      {isMultiCurrency ? (
        <div className='flex flex-col gap-1.5 items-end'>
          {amounts.map(({ currency, amount }) => (
            <div key={currency} className='flex items-baseline gap-3'>
              <span className='text-sm font-normal text-muted-foreground'>{currency}</span>
              <span className='text-xl font-bold'>{amount}</span>
            </div>
          ))}
        </div>
      ) : (
        <span className='text-2xl font-bold'>{amount}</span>
      )}
    </div>
  )
}
