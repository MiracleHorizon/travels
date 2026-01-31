<script setup lang="ts">
import { RefreshCw } from 'lucide-vue-next';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/shared/ui';
</script>

<template>
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <RefreshCw class="w-6 h-6 animate-spin" />
      </EmptyMedia>
      <EmptyTitle>Загрузка путешествий...</EmptyTitle>
      <EmptyDescription>Пожалуйста, подождите</EmptyDescription>
    </EmptyHeader>
  </Empty>
</template>
