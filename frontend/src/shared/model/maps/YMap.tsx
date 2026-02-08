import { DomEvent, YMapTheme } from 'ymaps3'
import { ComponentPropsWithoutRef } from 'react'

import { useYMaps } from './useYMaps'
import { YMapsProvider } from './YmapsContext'
import { DEFAULT_LOCATION, DEFAULT_THEME, DEFAULT_ZOOM } from './consts'
import { Spinner } from '@/shared/ui'

interface YMapComponentProps {
  theme?: YMapTheme
  initialLocation?: [number, number]
  initialZoom?: number
  onClick?: (event: DomEvent) => void
}

const YMapComponent = ({
  theme = DEFAULT_THEME,
  initialLocation = DEFAULT_LOCATION,
  initialZoom = DEFAULT_ZOOM,
  onClick
}: YMapComponentProps) => {
  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
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
    <YMap theme={theme} location={{ zoom: initialZoom, center: initialLocation }}>
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />

      <YMapListener layer='any' onClick={(_object, event) => onClick?.(event)} />

      <YMapControls orientation='vertical' position='right'>
        <YMapZoomControl />
      </YMapControls>
    </YMap>
  )
}

YMapComponent.displayName = 'YMapComponent'

// -------------------------------------------------------------------------------------

interface YMapProps extends ComponentPropsWithoutRef<typeof YMapComponent> {
  apiKey: string
}

export const YMap = ({ apiKey, ...mapProps }: YMapProps) => (
  <YMapsProvider apiKey={apiKey}>
    <YMapComponent {...mapProps} />
  </YMapsProvider>
)

YMap.displayName = 'YMap'
