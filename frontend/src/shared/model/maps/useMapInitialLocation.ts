import { useCallback, useEffect, useState } from 'react'

import { GeoCoords } from '@/shared/lib/geo'
import { DEFAULT_MAP_LOCATION } from './consts'

type LocationState =
  | {
      status: 'loading'
    }
  | {
      status: 'ready'
      coords: GeoCoords
    }

type UseMapInitialLocationProps = {
  coords: GeoCoords | undefined
}

export const useMapInitialLocation = ({ coords }: UseMapInitialLocationProps) => {
  const [state, setState] = useState<LocationState>(() => {
    if (coords) {
      return {
        status: 'ready',
        coords
      }
    }

    return {
      status: 'loading'
    }
  })

  const resolveLocation = useCallback(async () => {
    if (state.status === 'ready') {
      return
    }

    try {
      // TODO: Попробовать все же Geolocation API
      const res = await fetch('/geo/json')
      const data = await res.json()

      const lat = parseFloat(data.loc?.split(',')[0] || '0')
      const lon = parseFloat(data.loc?.split(',')[1] || '0')

      if (isNaN(lat) || isNaN(lon) || lat === 0 || lon === 0) {
        console.error('Не удалось получить координаты', data)
        setState({
          status: 'ready',
          coords: DEFAULT_MAP_LOCATION
        })
        return
      }

      setState({
        status: 'ready',
        coords: [lon, lat]
      })
    } catch (error) {
      console.error('IP гео:', error)
      setState({
        status: 'ready',
        coords: DEFAULT_MAP_LOCATION
      })
    }
  }, [state.status])

  useEffect(() => {
    // eslint-disable-next-line
    resolveLocation()
  }, [resolveLocation])

  return state
}
