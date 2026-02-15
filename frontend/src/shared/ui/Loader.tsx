import { Spinner } from './spinner'
import { cn } from '@/shared/lib/styles/utils'

interface LoaderProps {
  variant?: 'fullscreen' | 'fullsize'
}

export const Loader = ({ variant = 'fullsize' }: LoaderProps) => {
  return (
    <div
      className={cn(
        'flex justify-center items-center',
        variant === 'fullscreen' ? 'min-h-screen w-full' : 'h-full'
      )}
    >
      <Spinner className='size-12' />
    </div>
  )
}
