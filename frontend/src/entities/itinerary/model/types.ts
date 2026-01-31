export interface ItineraryItem {
  id: string;
  placeId: string;
  placeName: string;
  dayNumber: number;
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  notes?: string;
  travelTimeToNext?: number; // в минутах
  order: number; // порядок в рамках дня
}

export interface ItineraryDay {
  dayNumber: number;
  date: string;
  items: ItineraryItem[];
}

export interface CreateItineraryItemDto {
  placeId: string;
  placeName: string;
  dayNumber: number;
  startTime: string;
  endTime: string;
  notes?: string;
  travelTimeToNext?: number;
  order: number;
}

export interface UpdateItineraryItemDto {
  startTime?: string;
  endTime?: string;
  notes?: string;
  travelTimeToNext?: number;
  order?: number;
  dayNumber?: number;
}
