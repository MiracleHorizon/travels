export interface Travel {
  id: string
  destination: string
  startDate: string
  endDate: string
  isArchived: boolean
  createdAt: string
  updatedAt: string
}

export type CreateTravelDto = Omit<Travel, 'id' | 'createdAt' | 'updatedAt' | 'isArchived'>
export type UpdateTravelDto = Partial<CreateTravelDto>
