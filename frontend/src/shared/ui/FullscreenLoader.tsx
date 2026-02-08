import { Spinner } from './spinner'

export const FullscreenLoader = () => {
  return (
    <div className='flex justify-center items-center min-h-screen w-full'>
      <Spinner className='size-12' />
    </div>
  )
}
