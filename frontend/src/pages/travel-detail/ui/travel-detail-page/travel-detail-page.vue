<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { TravelApi, type Travel, TravelCard } from '@/entities/travel';
import { PlaceList } from '@/entities/place';
import { DeleteTravelButton } from '@/features/travel/delete';
import { UpdateTravelDialog } from '@/features/travel/update';
import { ArchiveTravelButton } from '@/features/travel/archive';
import { CreatePlaceDialog } from '@/features/place/create';
import { DeletePlaceButton } from '@/features/place/delete';
import { Button } from '@/shared/ui';
import { ArrowLeft, Calendar, Clock } from 'lucide-vue-next';

const placeListRef = ref<InstanceType<typeof PlaceList>>();

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

// Форматируем даты
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

const goBack = () => {
  router.push('/travels');
};

onMounted(() => {
  loadTravel();
});
</script>

<template>
  <div class="container mx-auto p-6 space-y-6">
    <!-- Шапка с кнопкой назад -->
    <div class="flex items-center gap-4">
      <Button variant="ghost" size="icon" @click="goBack">
        <ArrowLeft class="w-5 h-5" />
      </Button>
      <h1 class="text-3xl font-bold">Детали путешествия</h1>
    </div>

    <!-- Состояние загрузки -->
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100 mx-auto"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-400">Загрузка...</p>
      </div>
    </div>

    <!-- Состояние ошибки -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500 mb-4">{{ error }}</p>
      <Button @click="goBack">Вернуться к списку</Button>
    </div>

    <!-- Контент путешествия -->
    <div v-else-if="travel" class="space-y-6">
      <!-- Карточка путешествия -->
      <div class="max-w-2xl mx-auto">
        <TravelCard :travel="travel" :clickable="false">
          <template #actions="{ travel }">
            <ArchiveTravelButton :travel-id="travel.id" :is-archived="travel.isArchived"
              @toggled="handleArchiveToggled" />
            <UpdateTravelDialog :travel="travel" @updated="handleUpdated" />
            <DeleteTravelButton :travel-id="travel.id" @deleted="handleDeleted" />
          </template>
        </TravelCard>
      </div>

      <!-- Детальная информация -->
      <div class="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 space-y-6">
        <h2 class="text-2xl font-bold">Информация о путешествии</h2>

        <div class="space-y-4">
          <!-- Направление -->
          <div class="flex items-start gap-3">
            <div class="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Направление</p>
              <p class="text-lg font-semibold">{{ travel.destination }}</p>
            </div>
          </div>

          <!-- Даты -->
          <div class="flex items-start gap-3">
            <div class="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Calendar class="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Даты</p>
              <p class="text-lg font-semibold">{{ formattedDates }}</p>
            </div>
          </div>

          <!-- Длительность -->
          <div class="flex items-start gap-3">
            <div class="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Clock class="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Длительность</p>
              <p class="text-lg font-semibold">
                {{ duration }} {{ duration === 1 ? 'день' : duration < 5 ? 'дня' : 'дней' }} </p>
            </div>
          </div>

          <!-- Статус -->
          <div class="flex items-start gap-3">
            <div class="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Статус</p>
              <div class="flex gap-2 mt-1">
                <span class="text-sm px-3 py-1 rounded-full font-medium" :class="travel.status === 'upcoming'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'">
                  {{ travel.status === 'upcoming' ? 'Запланировано' : 'Завершено' }}
                </span>
                <span v-if="travel.isArchived"
                  class="text-sm px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 font-medium">
                  В архиве
                </span>
              </div>
            </div>
          </div>

          <!-- Теги -->
          <div v-if="travel.tags && travel.tags.length > 0" class="flex items-start gap-3">
            <div class="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
              <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Теги</p>
              <div class="flex flex-wrap gap-2">
                <span v-for="tag in travel.tags" :key="tag"
                  class="px-3 py-1 text-sm rounded-lg bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 font-medium">
                  #{{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- Метаданные -->
          <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
              <div>
                <span>Создано: </span>
                <span>{{ new Date(travel.createdAt).toLocaleString('ru-RU') }}</span>
              </div>
              <div>
                <span>Обновлено: </span>
                <span>{{ new Date(travel.updatedAt).toLocaleString('ru-RU') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Места для посещения -->
      <div class="max-w-4xl mx-auto space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold">Места для посещения</h2>
          <CreatePlaceDialog :travel-id="travelId" @created="placeListRef?.refresh()" />
        </div>

        <PlaceList ref="placeListRef" :travel-id="travelId">
          <template #place-actions="{ place }">
            <DeletePlaceButton :place-id="place.id" @deleted="placeListRef?.refresh()" />
          </template>
        </PlaceList>
      </div>

      <!-- Будущий функционал: маршруты, заметки, бюджет и т.д. -->
      <div
        class="max-w-2xl mx-auto bg-linear-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl p-8 text-center">
        <h3 class="text-xl font-semibold mb-2">Скоро здесь появится больше возможностей</h3>
        <p class="text-gray-600 dark:text-gray-400">
          Маршруты на карте, бюджет путешествия и многое другое
        </p>
      </div>
    </div>
  </div>
</template>
