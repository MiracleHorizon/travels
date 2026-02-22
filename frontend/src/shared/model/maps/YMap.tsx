import { DomEvent, YMapTheme } from 'ymaps3'
import { ReactNode } from 'react'
import { MapPin } from 'lucide-react'

import { useYMaps } from './useYMaps'
import { YMapsProvider } from './YMapsContext'
import {
  DEFAULT_MAP_LOCATION,
  DEFAULT_MAP_THEME,
  DEFAULT_MAP_ZOOM,
  YANDEX_MAPS_API_KEY
} from './consts'
import { Spinner } from '@/shared/ui'
import { GeoCoords } from '@/shared/lib/geo'

interface YMapComponentProps {
  theme?: YMapTheme
  initialZoom?: number
  initialLocation?: GeoCoords
  point?: GeoCoords
  pointPin?: ReactNode
  lang?: string
  onClick?: (event: DomEvent) => void
}

const YMapComponent = ({
  point,
  pointPin,
  theme = DEFAULT_MAP_THEME,
  initialLocation = DEFAULT_MAP_LOCATION,
  initialZoom = DEFAULT_MAP_ZOOM,
  onClick
}: YMapComponentProps) => {
  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapMarker,
    loading,
    YMapControls,
    YMapZoomControl,
    YMapListener
  } = useYMaps()

  if (loading) {
    return (
      <div className='flex justify-center items-center w-full h-full'>
        <Spinner className='size-12' />
      </div>
    )
  }

  return (
    <YMap
      className='w-full h-full'
      theme={theme}
      location={{
        zoom: initialZoom,
        center: [initialLocation.lng, initialLocation.lat]
      }}
    >
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />

      {point && YMapMarker && (
        <YMapMarker coordinates={[point.lng, point.lat]}>
          {pointPin ?? (
            <div className='flex justify-center items-center w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-lg border-2 border-background -translate-x-1/2 -translate-y-1/2'>
              <MapPin className='size-5' strokeWidth={2.5} />
            </div>
          )}
        </YMapMarker>
      )}

      <YMapListener layer='any' onClick={(_object, event) => onClick?.(event)} />

      <YMapControls orientation='vertical' position='right'>
        <YMapZoomControl />
      </YMapControls>
    </YMap>
  )
}

YMapComponent.displayName = 'YMapComponent'

// -------------------------------------------------------------------------------------

export const YMap = (props: YMapComponentProps) => {
  const { lang, ...componentProps } = props

  return (
    <YMapsProvider apiKey={YANDEX_MAPS_API_KEY} lang={lang}>
      <YMapComponent {...componentProps} />
    </YMapsProvider>
  )
}

YMap.displayName = 'YMap'
