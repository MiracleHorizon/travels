import { GeoCoords } from '@/shared/lib/geo'

export interface Travel {
  id: string
  name: string
  description?: string
  start_date: string
  end_date: string
  status?: 'upcoming' | 'past'
  tags?: string[]
  is_archived: boolean
  created_at: string
  updated_at: string
}

export interface TravelDetailed extends Travel {
  photos: TravelPhoto[]
  coords?: GeoCoords
  country_name?: string | null
}

export interface TravelPhoto {
  url: string
  description?: string
}
