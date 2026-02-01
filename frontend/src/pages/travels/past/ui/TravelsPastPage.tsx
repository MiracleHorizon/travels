import { useEffect, useState } from 'react'
import { Travel, TravelApi } from '@/entities/travel'
import { TravelsList } from '@/widgets/TravelsList'
import { Spinner } from '@/shared/ui'

export const TravelsPastPage = () => {
  const [travels, setTravels] = useState<Travel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTravels = async () => {
      try {
        setLoading(true)
        const data = await TravelApi.getPast()
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
        <h1 className='text-3xl font-bold mb-2'>Прошедшие путешествия</h1>
        <p className='text-muted-foreground'>Воспоминания о ваших путешествиях</p>
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
        <TravelsList travels={travels} emptyMessage='У вас пока нет прошедших путешествий' />
      )}
    </div>
  )
}
