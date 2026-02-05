import { ComponentPropsWithoutRef, memo } from 'react'

import { YmapsProvider } from '../context/YmapsContext'
import { Map } from './Map'

interface YandexMapProps extends ComponentPropsWithoutRef<typeof Map> {
  apiKey: string
}

export const YandexMap = memo(({ apiKey, ...mapProps }: YandexMapProps) => (
  <YmapsProvider apiKey={apiKey}>
    <Map {...mapProps} />
  </YmapsProvider>
))

YandexMap.displayName = 'YandexMap'
