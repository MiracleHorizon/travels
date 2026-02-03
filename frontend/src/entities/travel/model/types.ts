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
