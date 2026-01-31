<script setup lang="ts">
import { TabsTrigger } from 'reka-ui';
import { cn } from '@/shared/lib/styles/utils';

interface Props {
  value: string;
  disabled?: boolean;
}

defineProps<Props>();
</script>

<template>
  <TabsTrigger 
    :value="value"
    :disabled="disabled"
    :class="cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'data-[state=active]:bg-white data-[state=active]:text-gray-950 data-[state=active]:shadow-sm',
      'dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300',
      'dark:data-[state=active]:bg-gray-950 dark:data-[state=active]:text-gray-50',
      $attrs.class
    )"
  >
    <slot />
  </TabsTrigger>
</template>
