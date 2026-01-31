<script setup lang="ts">
import { Globe, Filter } from 'lucide-vue-next';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/shared/ui';

interface Props {
  hasAnyTravels: boolean;
}

defineProps<Props>();
</script>

<template>
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <Globe v-if="!hasAnyTravels" class="w-6 h-6" />
        <Filter v-else class="w-6 h-6" />
      </EmptyMedia>
      <EmptyTitle>
        {{ hasAnyTravels ? 'Нет путешествий в этой категории' : 'Нет путешествий' }}
      </EmptyTitle>
      <EmptyDescription>
        {{ hasAnyTravels 
          ? 'Попробуйте изменить фильтры или создайте новое путешествие' 
          : 'Начните планировать свое первое путешествие, создав новую поездку' 
        }}
      </EmptyDescription>
    </EmptyHeader>
  </Empty>
</template>
