<script setup lang="ts">
import { computed } from 'vue';
import { MapPin, Link as LinkIcon, MessageSquare } from 'lucide-vue-next';
import type { Place } from '../model/types';

interface Props {
  place: Place;
}

const props = defineProps<Props>();

const hasContent = computed(() => {
  return props.place.comment ||
    (props.place.links && props.place.links.length > 0) ||
    (props.place.photos && props.place.photos.length > 0);
});
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 space-y-3 hover:shadow-md transition-shadow">
    <!-- Заголовок с иконкой -->
    <div class="flex items-start justify-between gap-3">
      <div class="flex items-start gap-3 flex-1 min-w-0">
        <div class="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg shrink-0">
          <MapPin class="w-5 h-5 text-red-600 dark:text-red-400" />
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
            {{ place.name || 'Без названия' }}
          </h3>
          <p v-if="place.createdAt" class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {{ new Date(place.createdAt).toLocaleDateString('ru-RU') }}
          </p>
        </div>
      </div>

      <!-- Слот для кнопок действий -->
      <div class="flex gap-1 shrink-0">
        <slot name="actions" :place="place" />
      </div>
    </div>

    <!-- Комментарий -->
    <div v-if="place.comment" class="flex items-start gap-2 text-sm">
      <MessageSquare class="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
      <p class="text-gray-700 dark:text-gray-300">{{ place.comment }}</p>
    </div>

    <!-- Ссылки -->
    <div v-if="place.links && place.links.length > 0" class="space-y-1.5">
      <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <LinkIcon class="w-4 h-4" />
        <span>Ссылки</span>
      </div>
      <div class="space-y-1">
        <a v-for="(link, index) in place.links" :key="index" :href="link" target="_blank" rel="noopener noreferrer"
          class="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline truncate">
          <LinkIcon class="w-3 h-3 shrink-0" />
          <span class="truncate">{{ link }}</span>
        </a>
      </div>
    </div>

    <!-- Разделитель, если есть контент -->
    <div v-if="!hasContent" class="text-center text-sm text-gray-400 dark:text-gray-500 py-2">
      Нет дополнительной информации
    </div>
  </div>
</template>
