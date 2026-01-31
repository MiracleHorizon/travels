<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@/shared/ui';
import { Trash2 } from 'lucide-vue-next';
import { PlaceApi } from '@/entities/place';

interface Props {
  placeId: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  deleted: [];
}>();

const isDeleting = ref(false);

const deletePlace = async () => {
  if (!confirm('Вы уверены, что хотите удалить это место?')) {
    return;
  }

  isDeleting.value = true;

  try {
    await PlaceApi.delete(props.placeId);
    emit('deleted');
  } catch (error) {
    alert('Ошибка при удалении места ' + error);
  } finally {
    isDeleting.value = false;
  }
};
</script>

<template>
  <Button variant="ghost" size="icon" @click="deletePlace" :disabled="isDeleting"
    class="hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400">
    <Trash2 :size="16" />
  </Button>
</template>
