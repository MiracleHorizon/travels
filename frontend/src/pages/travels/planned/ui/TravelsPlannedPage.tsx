import { useTravelsQuery } from '@/entities/travel'
import { TravelsList } from '@/widgets/TravelsList'

export const TravelsPlannedPage = () => {
  const {
    data: travels = [],
    isLoading,
    error
  } = useTravelsQuery({
    status: 'upcoming'
  })

  return (
    <div className='container'>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold mb-2'>Запланированные путешествия</h1>
        <p className='text-muted-foreground'>Ваши предстоящие путешествия</p>
      </div>

      <TravelsList
        travels={travels}
        emptyMessage='У вас пока нет запланированных путешествий'
        isLoading={isLoading}
        error={error}
      />
    </div>
  )
}
