import { lazy, Suspense } from 'react'
import { Card, CardContent } from '@/shared/ui'

const MarkdownEditor = lazy(() => import('@/shared/ui/MarkdownEditor'))

const TravelDiaryPage = () => {
  return (
    <Card>
      <CardContent>
        <Suspense fallback={<div className='min-h-[200px] animate-pulse rounded-lg bg-muted' />}>
          <MarkdownEditor
            onSubmit={value => {
              console.log(value)
            }}
          />
        </Suspense>
      </CardContent>
    </Card>
  )
}

export default TravelDiaryPage
