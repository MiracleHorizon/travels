<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { TravelApi, type Travel } from '@/entities/travel';
import { PlaceList, PlaceApi } from '@/entities/place';
import type { Place } from '@/entities/place';
import { DeleteTravelButton } from '@/features/travel/delete';
import { UpdateTravelDialog } from '@/features/travel/update';
import { ArchiveTravelButton } from '@/features/travel/archive';
import { CreatePlaceDialog } from '@/features/place/create';
import { DeletePlaceButton } from '@/features/place/delete';
import { ItineraryWidget } from '@/widgets/itinerary';
import { Button, Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Tag,
  Archive,
  CheckCircle2,
  CalendarClock,
  Sparkles,
  Route
} from 'lucide-vue-next';

const placeListRef = ref<InstanceType<typeof PlaceList>>();
const itineraryWidgetRef = ref<InstanceType<typeof ItineraryWidget>>();
const places = ref<Place[]>([]);

const route = useRoute();
const router = useRouter();

const travel = ref<Travel | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);

const travelId = computed(() => route.params.id as string);

// Вычисляем длительность путешествия
const duration = computed(() => {
  if (!travel.value) return 0;
  const start = new Date(travel.value.startDate);
  const end = new Date(travel.value.endDate);
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return days;
});

// Форматируем даты для hero
const formattedStartDate = computed(() => {
  if (!travel.value) return '';
  const start = new Date(travel.value.startDate);
  return start.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
});

const formattedEndDate = computed(() => {
  if (!travel.value) return '';
  const end = new Date(travel.value.endDate);
  return end.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
});

// Форматируем даты для деталей
const formattedDates = computed(() => {
  if (!travel.value) return '';
  const start = new Date(travel.value.startDate);
  const end = new Date(travel.value.endDate);

  const startFormatted = start.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const endFormatted = end.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return `${startFormatted} — ${endFormatted}`;
});

// Генерируем красивое изображение-заглушку
const mockImageUrl = computed(() => {
  if (!travel.value) return '';
  const seed = travel.value.destination.toLowerCase().replace(/\s+/g, '-');
  return `https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&auto=format&fit=crop&q=80&seed=${seed}`;
});

// Градиент для оверлея
const gradientOverlay = 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)';

const loadTravel = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const travels = await TravelApi.getAll();
    const foundTravel = travels.find(t => t.id === travelId.value);

    if (!foundTravel) {
      error.value = 'Путешествие не найдено';
      return;
    }

    travel.value = foundTravel;
    
    // Загружаем места для этого путешествия
    places.value = await PlaceApi.getByTravelId(travelId.value);
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Ошибка при загрузке путешествия';
  } finally {
    isLoading.value = false;
  }
};

const handleUpdated = () => {
  loadTravel();
};

const handleDeleted = () => {
  router.push('/travels');
};

const handleArchiveToggled = () => {
  loadTravel();
};

const handlePlaceCreated = () => {
  placeListRef.value?.refresh();
  loadTravel(); // Обновляем список мест для маршрута
};

const goBack = () => {
  router.push('/travels');
};

onMounted(() => {
  loadTravel();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Состояние загрузки -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
        <p class="mt-6 text-lg text-gray-600 dark:text-gray-400">Загрузка путешествия...</p>
      </div>
    </div>

    <!-- Состояние ошибки -->
    <div v-else-if="error" class="flex items-center justify-center min-h-screen">
      <div class="text-center max-w-md mx-auto p-6">
        <div class="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Ошибка</h2>
        <p class="text-red-600 dark:text-red-400 mb-6">{{ error }}</p>
        <Button @click="goBack" size="lg">
          <ArrowLeft class="w-4 h-4 mr-2" />
          Вернуться к списку
        </Button>
      </div>
    </div>

    <!-- Контент путешествия -->
    <div v-else-if="travel">
      <!-- Hero секция с изображением -->
      <div class="relative h-[60vh] min-h-[500px] overflow-hidden">
        <!-- Фоновое изображение -->
        <img 
          :src="mockImageUrl" 
          :alt="travel.destination"
          class="absolute inset-0 w-full h-full object-cover"
        />
        
        <!-- Градиентный оверлей -->
        <div 
          class="absolute inset-0"
          :style="{ background: gradientOverlay }"
        />

        <!-- Кнопка назад -->
        <div class="absolute top-6 left-6 z-10">
          <Button 
            variant="ghost" 
            size="icon" 
            @click="goBack"
            class="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20"
          >
            <ArrowLeft class="w-5 h-5" />
          </Button>
        </div>

        <!-- Плавающая панель действий -->
        <div class="absolute top-6 right-6 z-10 flex gap-2">
          <ArchiveTravelButton 
            :travel-id="travel.id" 
            :is-archived="travel.isArchived"
            @toggled="handleArchiveToggled"
            class="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20"
          />
          <UpdateTravelDialog 
            :travel="travel" 
            @updated="handleUpdated"
          />
          <DeleteTravelButton 
            :travel-id="travel.id" 
            @deleted="handleDeleted"
          />
        </div>

        <!-- Контент Hero -->
        <div class="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div class="container mx-auto max-w-7xl">
            <!-- Бейджи статуса -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span 
                class="px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md shadow-lg flex items-center gap-2"
                :class="travel.status === 'upcoming' 
                  ? 'bg-blue-500/90 text-white' 
                  : 'bg-emerald-500/90 text-white'"
              >
                <CalendarClock v-if="travel.status === 'upcoming'" class="w-4 h-4" />
                <CheckCircle2 v-else class="w-4 h-4" />
                {{ travel.status === 'upcoming' ? 'Запланировано' : 'Завершено' }}
              </span>
              <span 
                v-if="travel.isArchived"
                class="px-4 py-2 rounded-full text-sm font-semibold bg-amber-500/90 text-white backdrop-blur-md shadow-lg flex items-center gap-2"
              >
                <Archive class="w-4 h-4" />
                В архиве
              </span>
            </div>

            <!-- Название направления -->
            <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
              {{ travel.destination }}
            </h1>

            <!-- Даты и длительность -->
            <div class="flex flex-wrap items-center gap-6 text-white/90">
              <div class="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl px-5 py-3">
                <Calendar class="w-6 h-6" />
                <div>
                  <div class="text-xs opacity-75 mb-0.5">Даты поездки</div>
                  <div class="font-semibold text-lg">{{ formattedStartDate }} — {{ formattedEndDate }}</div>
                </div>
              </div>
              <div class="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl px-5 py-3">
                <Clock class="w-6 h-6" />
                <div>
                  <div class="text-xs opacity-75 mb-0.5">Длительность</div>
                  <div class="font-semibold text-lg">
                    {{ duration }} {{ duration === 1 ? 'день' : duration < 5 ? 'дня' : 'дней' }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Основной контент -->
      <div class="container mx-auto max-w-7xl px-6 py-8 md:py-12">
        <!-- Карточки статистики -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-20 mb-12 relative z-10">
          <!-- Направление -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin class="w-7 h-7 text-white" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Направление</p>
                <p class="text-xl font-bold text-gray-900 dark:text-gray-100 truncate">{{ travel.destination }}</p>
              </div>
            </div>
          </div>

          <!-- Длительность -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock class="w-7 h-7 text-white" />
              </div>
              <div class="flex-1">
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Длительность</p>
                <p class="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {{ duration }} {{ duration === 1 ? 'день' : duration < 5 ? 'дня' : 'дней' }}
                </p>
              </div>
            </div>
          </div>

          <!-- Даты -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar class="w-7 h-7 text-white" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Период</p>
                <p class="text-sm font-semibold text-gray-900 dark:text-gray-100">{{ formattedDates }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Теги -->
        <div v-if="travel.tags && travel.tags.length > 0" class="mb-12">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-3 mb-4">
              <Tag class="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Теги</h2>
            </div>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tag in travel.tags" 
                :key="tag"
                class="px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 dark:from-blue-900/30 dark:to-indigo-900/30 dark:text-blue-300 font-medium border border-blue-200 dark:border-blue-800 hover:shadow-md transition-shadow"
              >
                #{{ tag }}
              </span>
            </div>
          </div>
        </div>

        <!-- Табы с контентом -->
        <Tabs default-value="itinerary" class="w-full">
          <TabsList class="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="itinerary" class="text-base">
              <Route class="w-4 h-4 mr-2" />
              Маршрут по дням
            </TabsTrigger>
            <TabsTrigger value="places" class="text-base">
              <MapPin class="w-4 h-4 mr-2" />
              Места
            </TabsTrigger>
            <TabsTrigger value="details" class="text-base">
              <Sparkles class="w-4 h-4 mr-2" />
              Детали
            </TabsTrigger>
          </TabsList>

          <!-- Таб: Маршрут -->
          <TabsContent value="itinerary" class="space-y-6">
            <ItineraryWidget
              ref="itineraryWidgetRef"
              :travel-id="travelId"
              :travel-start-date="travel.startDate"
              :travel-end-date="travel.endDate"
              :places="places"
            />
          </TabsContent>

          <!-- Таб: Места -->
          <TabsContent value="places" class="space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Места для посещения</h2>
                <p class="text-gray-600 dark:text-gray-400 mt-1">Добавьте интересные места в ваш маршрут</p>
              </div>
              <CreatePlaceDialog :travel-id="travelId" @created="handlePlaceCreated" />
            </div>

            <PlaceList ref="placeListRef" :travel-id="travelId">
              <template #place-actions="{ place }">
                <DeletePlaceButton :place-id="place.id" @deleted="handlePlaceCreated" />
              </template>
            </PlaceList>
          </TabsContent>

          <!-- Таб: Детали -->
          <TabsContent value="details" class="space-y-6">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Детальная информация</h2>
              
              <div class="space-y-6">
                <!-- Timeline дат -->
                <div class="relative pl-8 border-l-2 border-blue-200 dark:border-blue-800">
                  <div class="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500"></div>
                  <div class="mb-6">
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Начало путешествия</p>
                    <p class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {{ new Date(travel.startDate).toLocaleDateString('ru-RU', { 
                        weekday: 'long',
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      }) }}
                    </p>
                  </div>
                  
                  <div class="absolute -left-2 bottom-0 w-4 h-4 rounded-full bg-emerald-500"></div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Окончание путешествия</p>
                    <p class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {{ new Date(travel.endDate).toLocaleDateString('ru-RU', { 
                        weekday: 'long',
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      }) }}
                    </p>
                  </div>
                </div>

                <!-- Метаданные -->
                <div class="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                    Метаданные
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="flex items-start gap-3">
                      <div class="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <div>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Создано</p>
                        <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {{ new Date(travel.createdAt).toLocaleString('ru-RU') }}
                        </p>
                      </div>
                    </div>
                    <div class="flex items-start gap-3">
                      <div class="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </div>
                      <div>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Обновлено</p>
                        <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {{ new Date(travel.updatedAt).toLocaleString('ru-RU') }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Будущий функционал -->
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl p-8 text-center border border-blue-200 dark:border-blue-800">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Скоро здесь появится больше возможностей
              </h3>
              <p class="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Интерактивные карты маршрутов, планирование бюджета, заметки и многое другое
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  </div>
</template>
