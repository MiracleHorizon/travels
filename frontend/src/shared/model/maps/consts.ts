import { GeoCoords } from '@/shared/lib/geo'
import { YMapTheme } from 'ymaps3'

export const YANDEX_MAPS_API_KEY = import.meta.env.VITE_YANDEX_MAPS_API_KEY as string | undefined

export const DEFAULT_MAP_LOCATION: GeoCoords = {
  lng: 37.6173,
  lat: 55.755826
} as const // Москва
export const DEFAULT_MAP_THEME: YMapTheme = 'light' as const
export const DEFAULT_MAP_ZOOM = 11 as const
