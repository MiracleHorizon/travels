<script setup lang="ts">
import { TabsList } from 'reka-ui';
import { cn } from '@/shared/lib/styles/utils';
</script>

<template>
  <TabsList 
    :class="cn(
      'inline-flex h-10 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800 p-1 text-gray-500 dark:text-gray-400',
      $attrs.class
    )"
  >
    <slot />
  </TabsList>
</template>
