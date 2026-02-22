import { useTravelsQuery } from '@/entities/travel'
import { useTranslation } from 'react-i18next'
import { TravelsList } from '@/widgets/TravelsList'

export const TravelsPastPage = () => {
  const { t } = useTranslation()
  const {
    data: travels = [],
    isLoading,
    error
  } = useTravelsQuery({
    status: 'past'
  })

  return (
    <div>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold mb-2'>{t('travelsList.pastTitle')}</h1>
        <p className='text-muted-foreground'>{t('travelsList.pastDescription')}</p>
      </div>

      <TravelsList
        travels={travels}
        emptyMessage={t('travelsList.pastEmpty')}
        isLoading={isLoading}
        error={error}
      />
    </div>
  )
}
