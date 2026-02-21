import type { GeoCoords } from '@/shared/lib/geo'

export const isValidCoords = ({ lat, lng }: GeoCoords): boolean => {
  return lat != null && lng != null && !Number.isNaN(lat) && !Number.isNaN(lng)
}
