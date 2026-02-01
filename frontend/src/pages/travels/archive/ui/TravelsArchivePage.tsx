import { useEffect, useState } from 'react'
import { Travel, TravelApi } from '@/entities/travel'
import { TravelsList } from '@/widgets/TravelsList'
import { Spinner } from '@/shared/ui'

export const TravelsArchivePage = () => {
  const [travels, setTravels] = useState<Travel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTravels = async () => {
      try {
        setLoading(true)
        const data = await TravelApi.getArchived()
        setTravels(data)
      } catch (err) {
        setError('Не удалось загрузить путешествия')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTravels()
  }, [])

  return (
    <div className='container py-6'>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold mb-2'>Архив путешествий</h1>
        <p className='text-muted-foreground'>Архивированные путешествия</p>
      </div>

      {loading && (
        <div className='flex justify-center py-12'>
          <Spinner />
        </div>
      )}

      {error && (
        <div className='rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive'>
          {error}
        </div>
      )}

      {!loading && !error && (
        <TravelsList travels={travels} emptyMessage='В архиве пока нет путешествий' />
      )}
    </div>
  )
}
