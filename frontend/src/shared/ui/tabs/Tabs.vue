<script setup lang="ts">
import { TabsRoot } from 'reka-ui';

interface Props {
  defaultValue?: string;
  modelValue?: string;
}

defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<template>
  <TabsRoot 
    :default-value="defaultValue"
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </TabsRoot>
</template>
