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
import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface TravelEmptyPlaceholderProps {
  actions?: ReactNode
}

export const TravelEmptyPlaceholder = ({ actions }: TravelEmptyPlaceholderProps) => {
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
        {actions ?? (
          <Button onClick={navigateBack} variant='outline'>
            <ArrowLeft />
            Вернуться к списку
          </Button>
        )}
      </EmptyContent>
    </Empty>
  )
}
