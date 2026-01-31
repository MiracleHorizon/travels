<script setup lang="ts">
import { ThemeToggle } from '@/entities/theme';

</script>

<template>
  <div class='p-4'>
    <ThemeToggle class='mb-2' />

    <RouterView />
  </div>
</template>
