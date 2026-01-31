<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { PlaceApi, type Place } from '@/entities/place';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/shared/ui';
import { MapPin } from 'lucide-vue-next';
import PlaceCard from './PlaceCard.vue';

interface Props {
  travelId: string;
}

const props = defineProps<Props>();

const places = ref<Place[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);

const loadPlaces = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    places.value = await PlaceApi.getByTravelId(props.travelId);
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Ошибка при загрузке мест';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadPlaces();
});

defineExpose({
  refresh: loadPlaces,
});
</script>

<template>
  <div class="space-y-4">
    <!-- Загрузка -->
    <div v-if="isLoading" class="text-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100 mx-auto"></div>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Загрузка мест...</p>
    </div>

    <!-- Ошибка -->
    <div v-else-if="error" class="text-center py-8 text-red-500">
      {{ error }}
    </div>

    <!-- Пустое состояние -->
    <Empty v-else-if="places.length === 0">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MapPin class="w-6 h-6" />
        </EmptyMedia>
        <EmptyTitle>Нет мест для посещения</EmptyTitle>
        <EmptyDescription>
          Добавьте интересные места, которые хотите посетить в этом путешествии
        </EmptyDescription>
      </EmptyHeader>
    </Empty>

    <!-- Список мест -->
    <div v-else class="grid gap-4 md:grid-cols-2">
      <PlaceCard 
        v-for="place in places" 
        :key="place.id" 
        :place="place"
      >
        <template #actions="{ place }">
          <slot name="place-actions" :place="place" />
        </template>
      </PlaceCard>
    </div>
  </div>
</template>
