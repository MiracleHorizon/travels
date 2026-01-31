<script setup lang="ts">
import { computed } from 'vue';
import type { ItineraryDay } from '../model/types';
import { Card, Badge, Separator } from '@/shared/ui';
import { Clock, MapPin, Navigation, StickyNote } from 'lucide-vue-next';

interface Props {
  day: ItineraryDay;
  travelStartDate: string;
}

const props = defineProps<Props>();

// Вычисляем дату дня
const dayDate = computed(() => {
  const startDate = new Date(props.travelStartDate);
  const currentDate = new Date(startDate);
  currentDate.setDate(startDate.getDate() + props.day.dayNumber - 1);
  
  return currentDate.toLocaleDateString('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });
});

// Вычисляем общее время дня
const totalDayTime = computed(() => {
  if (props.day.items.length === 0) return 0;
  
  let totalMinutes = 0;
  props.day.items.forEach(item => {
    const [startHour, startMin] = item.startTime.split(':').map(Number);
    const [endHour, endMin] = item.endTime.split(':').map(Number);
    const duration = (endHour * 60 + endMin) - (startHour * 60 + startMin);
    totalMinutes += duration;
    if (item.travelTimeToNext) {
      totalMinutes += item.travelTimeToNext;
    }
  });
  
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes, total: totalMinutes };
});

// Форматируем время
const formatTime = (time: string) => {
  return time;
};

// Вычисляем длительность активности
const getActivityDuration = (startTime: string, endTime: string) => {
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);
  const duration = (endHour * 60 + endMin) - (startHour * 60 + startMin);
  
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  
  if (hours > 0 && minutes > 0) {
    return `${hours}ч ${minutes}м`;
  } else if (hours > 0) {
    return `${hours}ч`;
  } else {
    return `${minutes}м`;
  }
};

// Форматируем время в пути
const formatTravelTime = (minutes: number) => {
  if (minutes < 60) {
    return `${minutes} мин`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}ч ${mins}м` : `${hours}ч`;
};
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
    <!-- Заголовок дня -->
    <div class="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
      <div class="flex items-start justify-between">
        <div>
          <div class="flex items-center gap-3 mb-2">
            <h3 class="text-2xl font-bold">День {{ day.dayNumber }}</h3>
            <Badge class="bg-white/20 text-white border-white/30 hover:bg-white/30">
              {{ day.items.length }} {{ day.items.length === 1 ? 'место' : day.items.length < 5 ? 'места' : 'мест' }}
            </Badge>
          </div>
          <p class="text-blue-100 text-sm capitalize">{{ dayDate }}</p>
        </div>
        <div v-if="totalDayTime.total > 0" class="text-right">
          <div class="text-sm text-blue-100 mb-1">Общее время</div>
          <div class="text-xl font-bold">
            {{ totalDayTime.hours }}ч {{ totalDayTime.minutes }}м
          </div>
        </div>
      </div>
    </div>

    <!-- Список активностей -->
    <div class="p-6">
      <div v-if="day.items.length === 0" class="text-center py-12">
        <div class="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin class="w-8 h-8 text-gray-400" />
        </div>
        <p class="text-gray-500 dark:text-gray-400 mb-2">Нет запланированных мест</p>
        <p class="text-sm text-gray-400 dark:text-gray-500">Добавьте места в маршрут этого дня</p>
      </div>

      <div v-else class="space-y-4">
        <div 
          v-for="(item, index) in day.items" 
          :key="item.id"
          class="relative"
        >
          <!-- Элемент маршрута -->
          <div class="flex gap-4">
            <!-- Временная шкала -->
            <div class="flex flex-col items-center">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {{ index + 1 }}
              </div>
              <div 
                v-if="index < day.items.length - 1 || item.travelTimeToNext"
                class="w-0.5 flex-1 bg-gradient-to-b from-blue-300 to-indigo-300 dark:from-blue-700 dark:to-indigo-700 my-2"
              />
            </div>

            <!-- Контент -->
            <div class="flex-1 pb-4">
              <div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 hover:shadow-md transition-shadow">
                <!-- Время и название -->
                <div class="flex items-start justify-between mb-3">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                      <Clock class="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span class="font-semibold text-blue-600 dark:text-blue-400">
                        {{ formatTime(item.startTime) }} — {{ formatTime(item.endTime) }}
                      </span>
                      <Badge variant="outline" class="text-xs">
                        {{ getActivityDuration(item.startTime, item.endTime) }}
                      </Badge>
                    </div>
                    <h4 class="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      <MapPin class="w-5 h-5 text-gray-500" />
                      {{ item.placeName }}
                    </h4>
                  </div>
                  
                  <!-- Слот для действий -->
                  <div class="flex gap-1">
                    <slot name="item-actions" :item="item" />
                  </div>
                </div>

                <!-- Заметки -->
                <div v-if="item.notes" class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <StickyNote class="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>{{ item.notes }}</p>
                  </div>
                </div>
              </div>

              <!-- Время в пути до следующего места -->
              <div 
                v-if="item.travelTimeToNext && item.travelTimeToNext > 0"
                class="flex items-center gap-2 mt-3 ml-4 text-sm text-gray-500 dark:text-gray-400"
              >
                <Navigation class="w-4 h-4" />
                <span>Время в пути: {{ formatTravelTime(item.travelTimeToNext) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
