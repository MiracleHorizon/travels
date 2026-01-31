<script setup lang="ts">
import { Button } from '@/shared/ui';
import { useColorMode } from '@vueuse/core';
import { Moon, Sun } from 'lucide-vue-next'

const mode = useColorMode()

const changeTheme = () => mode.value = mode.value === 'light' ? 'dark' : "light"
</script>

<template>
  <Button size='icon-sm' variant='outline' @click="changeTheme">
    <Sun v-if="mode === 'light'" />
    <Moon v-if="mode === 'dark'" />
  </Button>
</template>
