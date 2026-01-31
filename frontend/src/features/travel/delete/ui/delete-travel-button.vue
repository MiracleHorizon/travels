<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@/shared/ui';
import { TravelApi } from '@/entities/travel';
import { Trash2 } from 'lucide-vue-next';

interface Props {
  travelId: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  deleted: [];
}>();

const isLoading = ref(false);

const handleDelete = async () => {
  if (!confirm('Вы уверены, что хотите удалить это путешествие?')) {
    return;
  }

  isLoading.value = true;

  try {
    await TravelApi.delete(props.travelId);
    emit('deleted');
  } catch (err) {
    console.error('Ошибка при удалении:', err);
    alert('Не удалось удалить путешествие');
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <Button 
    variant="destructive" 
    size="icon" 
    @click="handleDelete"
    :disabled="isLoading"
  >
    <Trash2 :size="16" />
  </Button>
</template>
