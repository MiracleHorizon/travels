<script setup lang="ts">
import { cn } from '@/shared/lib/styles/utils';

interface Props {
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div :class="cn('flex flex-col items-center justify-center gap-4 py-12 px-4', props.class)">
    <slot />
  </div>
</template>
