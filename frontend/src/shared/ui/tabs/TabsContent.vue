<script setup lang="ts">
import { TabsContent } from 'reka-ui';
import { cn } from '@/shared/lib/styles/utils';

interface Props {
  value: string;
}

defineProps<Props>();
</script>

<template>
  <TabsContent 
    :value="value"
    :class="cn(
      'mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2',
      'dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300',
      $attrs.class
    )"
  >
    <slot />
  </TabsContent>
</template>
