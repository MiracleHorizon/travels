import { useTravelsQuery } from '@/entities/travel'
import { TravelsList } from '@/widgets/TravelsList'

export const TravelsPastPage = () => {
  const {
    data: travels = [],
    isLoading,
    error
  } = useTravelsQuery({
    status: 'past'
  })

  return (
    <div className='container'>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold mb-2'>Прошедшие путешествия</h1>
        <p className='text-muted-foreground'>Воспоминания о ваших путешествиях</p>
      </div>

      <TravelsList
        travels={travels}
        emptyMessage='У вас пока нет прошедших путешествий'
        isLoading={isLoading}
        error={error}
      />
    </div>
  )
}
