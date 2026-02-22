import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
  const navigate = useNavigate()
  const navigateBack = () => navigate('/travels/planned')

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <MapPinOff className='h-6 w-6' />
        </EmptyMedia>
        <EmptyTitle>{t('travelPage.notFound')}</EmptyTitle>
        <EmptyDescription>{t('travelPage.notFoundDescription')}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        {actions ?? (
          <Button onClick={navigateBack} variant='outline'>
            <ArrowLeft />
            {t('travelPage.backToList')}
          </Button>
        )}
      </EmptyContent>
    </Empty>
  )
}
