export interface Travel {
  id: string
  name: string
  description?: string
  startDate: string
  endDate: string
  tags?: string[]
  isArchived: boolean
  createdAt: string
  updatedAt: string
}

export type CreateTravelDto = Omit<Travel, 'id' | 'createdAt' | 'updatedAt' | 'isArchived'>
