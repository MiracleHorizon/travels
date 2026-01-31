export interface Place {
  id: string;
  travelId: string;
  name: string;
  comment?: string;
  links: string[];
  photos: string[]; // URLs к фотографиям
  createdAt: string;
  updatedAt: string;
}

export interface CreatePlaceDto {
  travelId: string;
  name: string;
  comment?: string;
  links?: string[];
  photos?: string[];
}

export interface UpdatePlaceDto {
  name?: string;
  comment?: string;
  links?: string[];
  photos?: string[];
}
