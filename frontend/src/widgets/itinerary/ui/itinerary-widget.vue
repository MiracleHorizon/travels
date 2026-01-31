<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { ItineraryApi, ItineraryDayCard } from '@/entities/itinerary';
import type { ItineraryItem, ItineraryDay } from '@/entities/itinerary';
import type { Place } from '@/entities/place';
import { CreateItineraryItemDialog } from '@/features/itinerary/create';
import { UpdateItineraryItemDialog } from '@/features/itinerary/update';
import { DeleteItineraryItemButton } from '@/features/itinerary/delete';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui';
import { Calendar } from 'lucide-vue-next';

interface Props {
  travelId: string;
  travelStartDate: string;
  travelEndDate: string;
  places: Place[];
}

const props = defineProps<Props>();

const items = ref<ItineraryItem[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);

// Вычисляем количество дней путешествия
const totalDays = computed(() => {
  const start = new Date(props.travelStartDate);
  const end = new Date(props.travelEndDate);
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
});

// Группируем элементы по дням
const dayGroups = computed<ItineraryDay[]>(() => {
  const days: ItineraryDay[] = [];
  
  for (let i = 1; i <= totalDays.value; i++) {
    const dayItems = items.value
      .filter(item => item.dayNumber === i)
      .sort((a, b) => a.order - b.order);
    
    const date = new Date(props.travelStartDate);
    date.setDate(date.getDate() + i - 1);
    
    days.push({
      dayNumber: i,
      date: date.toISOString(),
      items: dayItems,
    });
  }
  
  return days;
});

const loadItems = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    items.value = await ItineraryApi.getByTravelId(props.travelId);
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Ошибка при загрузке маршрута';
  } finally {
    isLoading.value = false;
  }
};

const refresh = () => {
  loadItems();
};

onMounted(() => {
  loadItems();
});

defineExpose({
  refresh,
});
</script>

<template>
  <div class="space-y-6">
    <!-- Заголовок -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
          <Calendar class="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Маршрут по дням</h2>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            Детальное расписание на {{ totalDays }} {{ totalDays === 1 ? 'день' : totalDays < 5 ? 'дня' : 'дней' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Состояние загрузки -->
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-400">Загрузка маршрута...</p>
      </div>
    </div>

    <!-- Состояние ошибки -->
    <div v-else-if="error" class="text-center py-12">
      <div class="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <p class="text-red-600 dark:text-red-400">{{ error }}</p>
    </div>

    <!-- Список дней -->
    <div v-else class="space-y-4">
      <!-- Пустое состояние -->
      <div v-if="items.length === 0" class="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
        <div class="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar class="w-10 h-10 text-purple-600 dark:text-purple-400" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Маршрут пока не составлен
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
          Начните планировать свой день, добавляя места из списка в расписание по дням
        </p>
      </div>

      <!-- Аккордеон с днями -->
      <Accordion type="multiple" class="space-y-4" :default-value="['day-1']">
        <AccordionItem 
          v-for="day in dayGroups" 
          :key="day.dayNumber"
          :value="`day-${day.dayNumber}`"
          class="border-none"
        >
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <AccordionTrigger class="px-6 py-4 hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-900/50">
              <div class="flex items-center justify-between w-full pr-4">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
                    {{ day.dayNumber }}
                  </div>
                  <div class="text-left">
                    <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">
                      День {{ day.dayNumber }}
                    </h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {{ new Date(day.date).toLocaleDateString('ru-RU', { 
                        weekday: 'long',
                        day: 'numeric', 
                        month: 'long' 
                      }) }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-4">
                  <div class="text-right mr-4">
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ day.items.length }} {{ day.items.length === 1 ? 'место' : day.items.length < 5 ? 'места' : 'мест' }}
                    </div>
                  </div>
                  <CreateItineraryItemDialog
                    :travel-id="travelId"
                    :day-number="day.dayNumber"
                    :places="places"
                    :existing-items-count="day.items.length"
                    @created="refresh"
                    @click.stop
                  />
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent class="px-6 pb-6">
              <!-- Пустое состояние для дня -->
              <div v-if="day.items.length === 0" class="text-center py-8">
                <p class="text-gray-500 dark:text-gray-400 mb-4">
                  В этот день пока нет запланированных мест
                </p>
              </div>

              <!-- Список элементов дня -->
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
                        class="w-0.5 flex-1 bg-gradient-to-b from-blue-300 to-indigo-300 dark:from-blue-700 dark:to-indigo-700 my-2 min-h-[40px]"
                      />
                    </div>

                    <!-- Контент -->
                    <div class="flex-1 pb-4">
                      <div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <!-- Время и название -->
                        <div class="flex items-start justify-between mb-3">
                          <div class="flex-1">
                            <div class="flex items-center gap-2 mb-2">
                              <span class="font-semibold text-blue-600 dark:text-blue-400 text-sm">
                                {{ item.startTime }} — {{ item.endTime }}
                              </span>
                            </div>
                            <h4 class="text-lg font-bold text-gray-900 dark:text-gray-100">
                              {{ item.placeName }}
                            </h4>
                          </div>
                          
                          <!-- Действия -->
                          <div class="flex gap-1">
                            <UpdateItineraryItemDialog
                              :item="item"
                              @updated="refresh"
                            />
                            <DeleteItineraryItemButton
                              :item-id="item.id"
                              @deleted="refresh"
                            />
                          </div>
                        </div>

                        <!-- Заметки -->
                        <div v-if="item.notes" class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                          <p class="text-sm text-gray-600 dark:text-gray-400">{{ item.notes }}</p>
                        </div>
                      </div>

                      <!-- Время в пути -->
                      <div 
                        v-if="item.travelTimeToNext && item.travelTimeToNext > 0"
                        class="flex items-center gap-2 mt-3 ml-4 text-sm text-gray-500 dark:text-gray-400"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        <span>Время в пути: {{ item.travelTimeToNext }} мин</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  </div>
</template>
