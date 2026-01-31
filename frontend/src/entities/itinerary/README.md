# Itinerary Entity

Сущность для управления маршрутами путешествий по дням.

## Структура

```
itinerary/
├── model/
│   └── types.ts          # Типы данных
├── api/
│   └── itinerary-api.ts  # API для работы с маршрутами
├── ui/
│   ├── ItineraryDayCard.vue  # Карточка дня с расписанием
│   └── index.ts
└── index.ts
```

## Типы

### ItineraryItem

Элемент маршрута - конкретное место в определенный день с временными рамками.

```typescript
interface ItineraryItem {
  id: string;
  placeId: string;          // ID места из Place entity
  placeName: string;        // Название места (денормализация для производительности)
  dayNumber: number;        // Номер дня путешествия (1, 2, 3...)
  startTime: string;        // Время начала посещения (HH:mm)
  endTime: string;          // Время окончания посещения (HH:mm)
  notes?: string;           // Дополнительные заметки
  travelTimeToNext?: number; // Время в пути до следующего места (в минутах)
  order: number;            // Порядок в рамках дня
}
```

### ItineraryDay

Группировка элементов маршрута по дням.

```typescript
interface ItineraryDay {
  dayNumber: number;
  date: string;
  items: ItineraryItem[];
}
```

## API

### Методы

- `getByTravelId(travelId: string)` - получить все элементы маршрута для путешествия
- `create(travelId: string, dto: CreateItineraryItemDto)` - создать элемент маршрута
- `update(id: string, dto: UpdateItineraryItemDto)` - обновить элемент маршрута
- `delete(id: string)` - удалить элемент маршрута
- `updateOrder(updates: Array)` - массовое обновление порядка (для drag & drop)

## Компоненты

### ItineraryDayCard

Карточка для отображения расписания одного дня путешествия.

**Props:**
- `day: ItineraryDay` - данные дня
- `travelStartDate: string` - дата начала путешествия (для вычисления даты дня)

**Slots:**
- `item-actions` - слот для кнопок действий над элементом маршрута

**Особенности:**
- Автоматический расчет длительности посещения
- Визуальная временная шкала
- Отображение времени в пути между местами
- Подсчет общего времени дня

## Использование

```vue
<script setup lang="ts">
import { ItineraryDayCard } from '@/entities/itinerary';
import type { ItineraryDay } from '@/entities/itinerary';

const day: ItineraryDay = {
  dayNumber: 1,
  date: '2026-06-01',
  items: [
    {
      id: '1',
      placeId: 'place-1',
      placeName: 'Токийская башня',
      dayNumber: 1,
      startTime: '09:00',
      endTime: '11:00',
      notes: 'Купить билеты заранее',
      travelTimeToNext: 30,
      order: 0
    }
  ]
};
</script>

<template>
  <ItineraryDayCard 
    :day="day" 
    travel-start-date="2026-06-01"
  >
    <template #item-actions="{ item }">
      <button @click="editItem(item)">Редактировать</button>
      <button @click="deleteItem(item)">Удалить</button>
    </template>
  </ItineraryDayCard>
</template>
```

## Будущие улучшения

- [ ] Drag & drop для изменения порядка мест
- [ ] Автоматический расчет времени в пути через API карт
- [ ] Визуализация маршрута на карте
- [ ] Экспорт маршрута в PDF
- [ ] Шаблоны популярных маршрутов
