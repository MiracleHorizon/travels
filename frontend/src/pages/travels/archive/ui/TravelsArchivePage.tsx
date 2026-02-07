import { useTravelsQuery } from '@/entities/travel'
import { TravelsList } from '@/widgets/TravelsList'

export const TravelsArchivePage = () => {
  const {
    data: travels = [],
    isLoading,
    error
  } = useTravelsQuery({
    archived: true
  })

  return (
    <div className='container'>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold mb-2'>Архив путешествий</h1>
        <p className='text-muted-foreground'>Архивированные путешествия</p>
      </div>

      <TravelsList
        travels={travels}
        emptyMessage='В архиве пока нет путешествий'
        allowCreate={false}
        isLoading={isLoading}
        error={error}
      />
    </div>
  )
}
