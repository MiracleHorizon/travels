import type { ItineraryItem, CreateItineraryItemDto, UpdateItineraryItemDto } from '../model/types';

// Временное хранилище для разработки
let itineraryItems: ItineraryItem[] = [];
let nextId = 1;

export const ItineraryApi = {
  // Получить все элементы маршрута для путешествия
  async getByTravelId(travelId: string): Promise<ItineraryItem[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return itineraryItems.filter(item => item.placeId.startsWith(travelId));
  },

  // Создать элемент маршрута
  async create(travelId: string, dto: CreateItineraryItemDto): Promise<ItineraryItem> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newItem: ItineraryItem = {
      id: `itinerary-${nextId++}`,
      ...dto,
    };
    
    itineraryItems.push(newItem);
    return newItem;
  },

  // Обновить элемент маршрута
  async update(id: string, dto: UpdateItineraryItemDto): Promise<ItineraryItem> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = itineraryItems.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Элемент маршрута не найден');
    }
    
    itineraryItems[index] = {
      ...itineraryItems[index],
      ...dto,
    };
    
    return itineraryItems[index];
  },

  // Удалить элемент маршрута
  async delete(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    itineraryItems = itineraryItems.filter(item => item.id !== id);
  },

  // Массовое обновление порядка элементов
  async updateOrder(updates: { id: string; order: number; dayNumber: number }[]): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    updates.forEach(update => {
      const item = itineraryItems.find(i => i.id === update.id);
      if (item) {
        item.order = update.order;
        item.dayNumber = update.dayNumber;
      }
    });
  },
};
