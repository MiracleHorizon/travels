import { useContext } from 'react'

import { YMaps3Context } from './YmapsContext'

export const useYmaps3 = () => {
  const { reactify, ymaps, controlsModule } = useContext(YMaps3Context)

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
