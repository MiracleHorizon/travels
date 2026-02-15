const GEOCODER_KINDS = [
  'house',
  'street',
  'metro',
  'district',
  'locality',
  'area',
  'province',
  'country',
  'region',
  'hydro',
  'railway_station',
  'station',
  'route',
  'vegetation',
  'airport',
  'entrance',
  'other'
] as const

export type GeocoderKind = (typeof GEOCODER_KINDS)[number]

export interface AddressComponent {
  kind: string
  name: string
}

export interface GeocoderMetaData {
  text?: string
  Address?: {
    Components: AddressComponent[]
    formatted?: string
  }
}

export interface GeoObject {
  metaDataProperty?: {
    GeocoderMetaData?: GeocoderMetaData & { text?: string }
  }
  Point?: {
    pos: string // "lon lat"
  }
}

export interface GeocoderResponse {
  response?: {
    GeoObjectCollection?: {
      featureMember?: Array<{
        GeoObject?: GeoObject
      }>
    }
  }
}

export type GeoCoords = {
  lng: number
  lat: number
}
