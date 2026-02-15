import { useEffect, useState } from 'react'

import { GeoCoords } from '@/shared/lib/geo'
import { DEFAULT_MAP_LOCATION } from '@/shared/model/maps'

type LocationState =
  | {
      status: 'loading'
    }
  | {
      status: 'ready'
      coords: GeoCoords
    }

interface UseMapInitialLocationProps {
  coords: GeoCoords | undefined
}

export const useMapInitialLocation = ({ coords }: UseMapInitialLocationProps) => {
  const [state, setState] = useState<LocationState>(() =>
    coords
      ? {
          status: 'ready',
          coords
        }
      : {
          status: 'loading'
        }
  )

  useEffect(() => {
    if (coords) return

    const fetchLocation = async () => {
      try {
        const res = await fetch('/geo/json')
        const data = await res.json()

        const lat = parseFloat(data.loc?.split(',')[0] || '0')
        const lng = parseFloat(data.loc?.split(',')[1] || '0')

        if (isNaN(lat) || isNaN(lng) || lat === 0 || lng === 0) {
          setState({ status: 'ready', coords: DEFAULT_MAP_LOCATION })
          return
        }

        setState({ status: 'ready', coords: { lng, lat } })
      } catch {
        setState({ status: 'ready', coords: DEFAULT_MAP_LOCATION })
      }
    }

    fetchLocation()
  }, [coords])

  return state
}
