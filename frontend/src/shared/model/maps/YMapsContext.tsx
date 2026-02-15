import { ReactifiedModule, Reactify } from '@yandex/ymaps3-types/reactify'
import type controlsModule from '@yandex/ymaps3-types/packages/controls'
import { createContext, PropsWithChildren, useEffect, useState } from 'react'

import { Loader } from '@/shared/ui'
import { initYMaps } from './initYMaps'

export interface YMapsType {
  ymaps: typeof ymaps3
  reactify: Reactify
  controlsModule?: ReactifiedModule<typeof controlsModule>
}

export const YMapsContext = createContext<Partial<YMapsType>>({})

export const YMapsProvider = ({
  children,
  apiKey
}: PropsWithChildren<{
  apiKey: string
}>) => {
  const [maps, setMaps] = useState<Partial<YMapsType>>({})
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    initYMaps(apiKey)
      .then(result => setMaps(result))
      .catch(err => {
        console.error('[YmapsProvider] Ошибка инициализации Яндекс.Карт:', err)
        setError(err)
      })
  }, [apiKey])

  if (error) {
    return <div>Ошибка загрузки карты: {error.message}</div>
  }

  if (!maps.ymaps || !maps.reactify) {
    return <Loader variant='fullsize' />
  }

  return <YMapsContext.Provider value={maps}>{children}</YMapsContext.Provider>
}
