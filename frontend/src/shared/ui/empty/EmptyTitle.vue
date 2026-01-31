<script setup lang="ts">
import { cn } from '@/shared/lib/styles/utils';

interface Props {
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <h3 :class="cn('text-lg font-semibold', props.class)">
    <slot />
  </h3>
</template>
