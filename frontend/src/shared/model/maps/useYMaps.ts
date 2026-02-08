import { useContext } from 'react'

import { YMapsContext } from './YmapsContext'

export const useYMaps = () => {
  const { reactify, ymaps, controlsModule } = useContext(YMapsContext)

  if (!reactify || !ymaps || !controlsModule) {
    const {
      YMap,
      YMapControls,
      YMapDefaultSchemeLayer,
      YMapDefaultFeaturesLayer,
      YMapMarker,
      YMapControl,
      YMapControlButton,
      YMapScaleControl,
      YMapFeature
    } = reactify?.module(ymaps3) || {}

    const { YMapGeolocationControl, YMapZoomControl } = controlsModule || {}

    return {
      loading: true as const,
      YMap,
      YMapControls,
      YMapDefaultSchemeLayer,
      YMapDefaultFeaturesLayer,
      YMapMarker,
      YMapControl,
      YMapControlButton,
      YMapScaleControl,
      YMapGeolocationControl,
      YMapZoomControl,
      YMapFeature
    }
  }

  const {
    YMap,
    YMapControls,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapMarker,
    YMapControlButton,
    YMapScaleControl,
    YMapControl,
    YMapFeature,
    YMapListener
  } = reactify.module(ymaps3)

  const { YMapGeolocationControl, YMapZoomControl } = controlsModule

  return {
    loading: false as const,
    YMap,
    YMapControls,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapMarker,
    YMapControlButton,
    YMapScaleControl,
    YMapControl,
    YMapGeolocationControl,
    YMapZoomControl,
    YMapFeature,
    YMapListener
  }
}
