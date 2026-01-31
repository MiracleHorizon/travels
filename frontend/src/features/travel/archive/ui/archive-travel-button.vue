<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@/shared/ui';
import { TravelApi } from '@/entities/travel';
import { Archive, ArchiveRestore } from 'lucide-vue-next';

interface Props {
  travelId: string;
  isArchived: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  toggled: [];
}>();

const isLoading = ref(false);

const handleToggleArchive = async () => {
  isLoading.value = true;

  try {
    if (props.isArchived) {
      await TravelApi.unarchive(props.travelId);
    } else {
      await TravelApi.archive(props.travelId);
    }
    emit('toggled');
  } catch (err) {
    console.error('Ошибка при архивировании:', err);
    alert('Не удалось изменить статус архивации');
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <Button 
    variant="ghost" 
    size="icon" 
    @click="handleToggleArchive"
    :disabled="isLoading"
    :title="isArchived ? 'Разархивировать' : 'Архивировать'"
  >
    <ArchiveRestore v-if="isArchived" :size="16" />
    <Archive v-else :size="16" />
  </Button>
</template>
