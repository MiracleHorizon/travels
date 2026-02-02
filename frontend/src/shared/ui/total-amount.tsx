import { cn } from '@/shared/lib/styles/utils'

interface TotalAmountProps {
  label?: string
  amount: string
  className?: string
}

export const TotalAmount = ({ label = 'Всего:', amount, className }: TotalAmountProps) => {
  return (
    <div className={cn('flex justify-between items-center', className)}>
      <span className='text-lg font-medium'>{label}</span>
      <span className='text-2xl font-bold'>{amount}</span>
    </div>
  )
}
