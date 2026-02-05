import { ReactifiedModule, Reactify } from '@yandex/ymaps3-types/reactify'
import type controlsModule from '@yandex/ymaps3-types/packages/controls'
import { createContext, PropsWithChildren, useEffect, useState } from 'react'

import { initYmaps3 } from '../utils/initYmaps3'

export interface YMaps3Type {
  ymaps: typeof ymaps3
  reactify: Reactify
  controlsModule?: ReactifiedModule<typeof controlsModule>
}

export const YMaps3Context = createContext<Partial<YMaps3Type>>({})

export const YmapsProvider = ({
  children,
  apiKey
}: PropsWithChildren<{
  apiKey: string
}>) => {
  const [maps, setMaps] = useState<Partial<YMaps3Type>>({})
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    initYmaps3(apiKey)
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
    return <div>Загрузка карты...</div>
  }

  return <YMaps3Context.Provider value={maps}>{children}</YMaps3Context.Provider>
}
