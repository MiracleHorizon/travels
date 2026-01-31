<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import {
  TravelApi,
  type Travel,
  type TravelStatus,
  TravelCard,
  TravelListLoading,
  TravelListError,
  TravelListEmpty
} from '@/entities/travel';
import { DeleteTravelButton } from '@/features/travel/delete';
import { UpdateTravelDialog } from '@/features/travel/update';
import { ArchiveTravelButton } from '@/features/travel/archive';

interface Props {
  status?: TravelStatus;
  showArchived?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showArchived: false,
});

const travels = ref<Travel[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);

const filteredTravels = computed(() => {
  return travels.value.filter(travel => {
    // Фильтр по архивации
    if (props.showArchived && !travel.isArchived) return false;
    if (!props.showArchived && travel.isArchived) return false;

    // Фильтр по статусу
    if (props.status && travel.status !== props.status) return false;

    return true;
  });
});

const loadTravels = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    travels.value = await TravelApi.getAll();
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Ошибка при загрузке путешествий';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadTravels();
});

defineExpose({
  refresh: loadTravels,
});
</script>

<template>
  <div class="space-y-4">
    <TravelListLoading v-if="isLoading" />
    <TravelListError v-else-if="error" :error="error" />
    <TravelListEmpty v-else-if="filteredTravels.length === 0" :has-any-travels="travels.length > 0" />

    <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <TravelCard v-for="travel in filteredTravels" :key="travel.id" :travel="travel">
        <template #actions="{ travel }">
          <ArchiveTravelButton :travel-id="travel.id" :is-archived="travel.isArchived" @toggled="loadTravels" />
          <UpdateTravelDialog :travel="travel" @updated="loadTravels" />
          <DeleteTravelButton :travel-id="travel.id" @deleted="loadTravels" />
        </template>
      </TravelCard>
    </div>
  </div>
</template>
