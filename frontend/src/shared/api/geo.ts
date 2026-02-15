import { API_BASE_URL } from './consts'
import type { GeoCoords } from '../lib/geo'

export interface GeoLocationResult {
  text: string
  coords: GeoCoords
}

const GEOCODER_KINDS = ['locality', 'country', 'province', 'area', 'street', 'house'] as const

export const searchLocations = async (query: string): Promise<GeoLocationResult[]> => {
  if (!query.trim()) {
    return []
  }

  const response = await fetch(`${API_BASE_URL}/v1/geo/location`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      location: query.trim(),
      kinds: GEOCODER_KINDS
    })
  })

  if (!response.ok) {
    return []
  }

  const data = (await response.json()) as {
    locations?: GeoLocationResult[]
  }

  return data.locations ?? []
}
