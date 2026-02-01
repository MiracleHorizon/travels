export interface Travel {
  id: string
  name: string
  description?: string
  startDate: string
  endDate: string
  status: 'upcoming' | 'past'
  tags: string[]
  isArchived: boolean
  createdAt: string
  updatedAt: string
}
