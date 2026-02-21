import { Skeleton } from '@/shared/ui'

export const WeatherWidgetSkeleton = () => (
  <div className='rounded-2xl border border-border bg-card/80 p-4 sm:p-5 min-h-[156px] flex flex-row items-center gap-3 sm:gap-4'>
    <div className='min-w-0 flex-1 flex flex-col gap-2'>
      <Skeleton className='h-3 w-12' />
      <Skeleton className='h-9 w-16 sm:w-20' />
      <Skeleton className='h-3 w-32 sm:w-40' />
      <Skeleton className='h-3 w-24' />
    </div>
    <Skeleton className='size-12 shrink-0 rounded-lg sm:size-24' />
  </div>
)
