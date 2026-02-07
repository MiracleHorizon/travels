import { cn } from '@/shared/lib'
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/shared/ui'

import { ComponentProps, memo } from 'react'

interface TravelGalleryProps {
  images: string[]
  travelName: string
  plugins?: ComponentProps<typeof Carousel>['plugins']
  opts?: ComponentProps<typeof Carousel>['opts']
  onClick?: () => void
}

const FALLBACK_IMAGE = 'https://avatar.vercel.sh/shadcn1'

export const TravelGallery = memo(({ images, travelName, ...props }: TravelGalleryProps) => {
  const imagesToShow = images.length > 0 ? images.slice(0, 10) : [FALLBACK_IMAGE]

  return (
    <Carousel {...props} className={cn('group', props.onClick && 'cursor-pointer')}>
      <CarouselContent>
        {imagesToShow.map((image, index) => (
          <CarouselItem key={index}>
            <div className='h-[400px] w-full'>
              <img
                src={image}
                alt={`${travelName} - фото ${index + 1}`}
                className='h-full w-full object-cover'
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {imagesToShow.length > 1 && (
        <>
          <CarouselPrevious
            variant='secondary'
            className='left-4 h-11 opacity-0 transition-opacity group-hover:opacity-100'
          />
          <CarouselNext
            variant='secondary'
            className='right-4 h-11 opacity-0 transition-opacity group-hover:opacity-100'
          />
          <CarouselDots />
        </>
      )}
    </Carousel>
  )
})
