<script setup lang="ts">
import { ref } from 'vue';
import { ItineraryApi } from '@/entities/itinerary';
import { Button } from '@/shared/ui';
import { Trash2 } from 'lucide-vue-next';

interface Props {
  itemId: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  deleted: [];
}>();

const isDeleting = ref(false);

const handleDelete = async () => {
  if (!confirm('Удалить это место из маршрута?')) {
    return;
  }

  isDeleting.value = true;

  try {
    await ItineraryApi.delete(props.itemId);
    emit('deleted');
  } catch (error) {
    console.error('Ошибка при удалении элемента маршрута:', error);
    alert('Не удалось удалить элемент маршрута');
  } finally {
    isDeleting.value = false;
  }
};
</script>

<template>
  <Button
    variant="ghost"
    size="icon"
    @click="handleDelete"
    :disabled="isDeleting"
    class="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
  >
    <Trash2 class="w-4 h-4" />
  </Button>
</template>
