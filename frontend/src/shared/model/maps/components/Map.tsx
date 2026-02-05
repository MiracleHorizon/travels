import { DomEvent, YMapTheme } from 'ymaps3'
import { useYmaps3 } from '../context/useYmaps3'
import { memo } from 'react'

const DEFAULT_LOCATION: [number, number] = [37.6173, 55.755826] // Москва
const DEFAULT_THEME: YMapTheme = 'light'
const DEFAULT_ZOOM = 13

interface MapProps {
  theme?: YMapTheme
  initialLocation?: [number, number]
  initialZoom?: number
  onClick?: (event: DomEvent) => void
}

export const Map = memo(
  ({
    theme = DEFAULT_THEME,
    initialLocation = DEFAULT_LOCATION,
    initialZoom = DEFAULT_ZOOM,
    onClick
  }: MapProps) => {
    const {
      YMap,
      YMapDefaultSchemeLayer,
      YMapDefaultFeaturesLayer,
      loading,
      YMapControls,
      YMapZoomControl,
      YMapListener
    } = useYmaps3()

    if (loading) {
      return (
        <div>
          <div>Loading...</div>
        </div>
      )
    }

    return (
      <YMap theme={theme} location={{ zoom: initialZoom, center: initialLocation }}>
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />

        <YMapListener layer='any' onClick={(_object, event) => onClick?.(event)} />

        <YMapControls orientation='vertical' position='bottom right'>
          {/* <YMapGeolocationControl /> */}
          <YMapZoomControl />
        </YMapControls>
      </YMap>
    )
  }
)

Map.displayName = 'YandexMapComponent'
