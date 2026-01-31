<script setup lang="ts">
import { cn } from '@/shared/lib/styles/utils';

interface Props {
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div :class="cn('flex flex-col items-center gap-2', props.class)">
    <slot />
  </div>
</template>
