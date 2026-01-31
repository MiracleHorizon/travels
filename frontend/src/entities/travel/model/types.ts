export type TravelStatus = 'upcoming' | 'past';

export interface Travel {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: TravelStatus;
  isArchived: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateTravelDto {
  destination: string;
  startDate: string;
  endDate: string;
  tags?: string[];
}

export interface UpdateTravelDto {
  destination?: string;
  startDate?: string;
  endDate?: string;
  isArchived?: boolean;
  tags?: string[];
}
