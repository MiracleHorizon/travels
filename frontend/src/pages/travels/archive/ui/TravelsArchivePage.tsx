import { useTravelsQuery } from '@/entities/travel'
import { useTranslation } from 'react-i18next'
import { TravelsList } from '@/widgets/TravelsList'

export const TravelsArchivePage = () => {
  const { t } = useTranslation()
  const {
    data: travels = [],
    isLoading,
    error
  } = useTravelsQuery({
    archived: true
  })

  return (
    <div>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold mb-2'>{t('travelsList.archiveTitle')}</h1>
        <p className='text-muted-foreground'>{t('travelsList.archiveDescription')}</p>
      </div>

      <TravelsList
        travels={travels}
        emptyMessage={t('travelsList.archiveEmpty')}
        allowCreate={false}
        isLoading={isLoading}
        error={error}
      />
    </div>
  )
}
