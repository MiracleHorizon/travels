<script setup lang="ts">
import { AlertCircle } from 'lucide-vue-next';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/shared/ui';

interface Props {
  error: string;
}

defineProps<Props>();
</script>

<template>
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon" class="bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400">
        <AlertCircle class="w-6 h-6" />
      </EmptyMedia>
      <EmptyTitle class="text-red-600 dark:text-red-400">Ошибка загрузки</EmptyTitle>
      <EmptyDescription>{{ error }}</EmptyDescription>
    </EmptyHeader>
  </Empty>
</template>
