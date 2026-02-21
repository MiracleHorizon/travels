import { Skeleton } from '@/shared/ui'

export const WeatherForecastDialogSkeleton = () => {
  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-3 pb-3 border-b border-border'>
        <Skeleton className='size-14 rounded-lg' />
        <div className='space-y-2'>
          <Skeleton className='h-8 w-16' />
          <Skeleton className='h-4 w-32' />
        </div>
      </div>

      <div className='space-y-2'>
        <Skeleton className='h-5 mb-3 w-20' />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className='h-12 w-full rounded-lg' />
        ))}
      </div>
      <div className='pt-3 h-[33px] border-t border-border flex flex-wrap gap-4'>
        <Skeleton className='h-4 w-20' />
        <Skeleton className='h-4 w-16' />
        <Skeleton className='h-4 w-24' />
      </div>
    </div>
  )
}
