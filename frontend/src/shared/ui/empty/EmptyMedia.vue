<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/shared/lib/styles/utils';

interface Props {
  variant?: 'default' | 'icon';
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
});

const mediaClasses = computed(() => {
  return cn(
    'flex items-center justify-center',
    props.variant === 'icon' && 'size-12 rounded-full bg-muted text-muted-foreground',
    props.class
  );
});
</script>

<template>
  <div :class="mediaClasses">
    <slot />
  </div>
</template>
