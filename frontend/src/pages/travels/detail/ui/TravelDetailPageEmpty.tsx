import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  Button
} from '@/shared/ui'
import { ArrowLeft, MapPinOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const TravelDetailPageEmpty = () => {
  const navigate = useNavigate()
  const navigateBack = () => navigate('/travels/planned')

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <MapPinOff className='h-6 w-6' />
        </EmptyMedia>
        <EmptyTitle>Путешествие не найдено</EmptyTitle>
        <EmptyDescription>Возможно, оно было удалено или не существует</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={navigateBack} variant='outline'>
          <ArrowLeft />
          Вернуться к списку
        </Button>
      </EmptyContent>
    </Empty>
  )
}
