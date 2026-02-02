import { useTravelsQuery } from '@/entities/travel'
import { TravelsList } from '@/widgets/TravelsList'
import { Spinner } from '@/shared/ui'

export const TravelsPastPage = () => {
  const {
    data: travels = [],
    isLoading,
    error
  } = useTravelsQuery({ status: 'past', archived: false })

  return (
    <div className='container'>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold mb-2'>Прошедшие путешествия</h1>
        <p className='text-muted-foreground'>Воспоминания о ваших путешествиях</p>
      </div>

      {isLoading && (
        <div className='flex justify-center py-12'>
          <Spinner />
        </div>
      )}

      {error && (
        <div className='rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive'>
          Не удалось загрузить путешествия
        </div>
      )}

      {!isLoading && !error && (
        <TravelsList travels={travels} emptyMessage='У вас пока нет прошедших путешествий' />
      )}
    </div>
  )
}
