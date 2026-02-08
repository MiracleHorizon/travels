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
  Address: {
    Components: AddressComponent[]
  }
}

export interface GeoObject {
  metaDataProperty?: {
    GeocoderMetaData?: GeocoderMetaData
  }
}

export interface GeocoderResponse {
  response?: {
    GeoObjectCollection?: {
      featureMember?: Array<{ GeoObject?: GeoObject }>
    }
  }
}
