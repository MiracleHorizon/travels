<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import type { Travel } from '../model/types';

interface Props {
  travel: Travel;
  clickable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  clickable: true,
});

const router = useRouter();

const handleClick = (event: MouseEvent) => {
  // Проверяем, что клик не был по кнопке действия
  const target = event.target as HTMLElement;
  if (target.closest('button') || !props.clickable) {
    return;
  }
  
  router.push(`/travels/${props.travel.id}`);
};

// Вычисляем длительность путешествия
const duration = computed(() => {
  const start = new Date(props.travel.startDate);
  const end = new Date(props.travel.endDate);
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return days;
});

// Форматируем даты
const formattedDates = computed(() => {
  const start = new Date(props.travel.startDate);
  const end = new Date(props.travel.endDate);
  
  const startMonth = start.toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' });
  const endMonth = end.toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' });
  const year = end.getFullYear();
  
  return `${startMonth} — ${endMonth}, ${year}`;
});

// Генерируем красивое изображение-заглушку на основе destination
const mockImageUrl = computed(() => {
  // Используем Unsplash Source API для красивых изображений путешествий
  const seed = props.travel.destination.toLowerCase().replace(/\s+/g, '-');
  return `https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop&q=60&seed=${seed}`;
});

// Градиент для оверлея на изображении
const gradientOverlay = 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)';
</script>

<template>
  <div 
    class="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
    :class="{ 
      'opacity-75': travel.isArchived,
      'cursor-pointer': clickable
    }"
    @click="handleClick"
  >
    <!-- Изображение с градиентом -->
    <div class="relative h-56 overflow-hidden">
      <img 
        :src="mockImageUrl" 
        :alt="travel.destination"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div 
        class="absolute inset-0"
        :style="{ background: gradientOverlay }"
      />
      
      <!-- Бейджи статуса поверх изображения -->
      <div class="absolute top-4 left-4 flex gap-2">
        <span 
          class="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md shadow-lg"
          :class="travel.status === 'upcoming' 
            ? 'bg-blue-500/90 text-white' 
            : 'bg-gray-700/90 text-gray-100'"
        >
          {{ travel.status === 'upcoming' ? '🗓️ Запланировано' : '✓ Завершено' }}
        </span>
        <span 
          v-if="travel.isArchived"
          class="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/90 text-white backdrop-blur-md shadow-lg"
        >
          📦 Архив
        </span>
      </div>

      <!-- Название места поверх изображения -->
      <div class="absolute bottom-4 left-4 right-4">
        <h3 class="text-2xl font-bold text-white mb-1 drop-shadow-lg">
          {{ travel.destination }}
        </h3>
      </div>
    </div>

    <!-- Информация о путешествии -->
    <div class="p-5 space-y-3">
      <!-- Даты и длительность -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span class="text-sm font-medium">{{ formattedDates }}</span>
        </div>
        <div class="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-xs">{{ duration }} {{ duration === 1 ? 'день' : duration < 5 ? 'дня' : 'дней' }}</span>
        </div>
      </div>

      <!-- Теги -->
      <div v-if="travel.tags && travel.tags.length > 0" class="flex flex-wrap gap-1.5">
        <span 
          v-for="tag in travel.tags" 
          :key="tag"
          class="px-2 py-0.5 text-xs rounded-md bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-medium"
        >
          #{{ tag }}
        </span>
      </div>

      <!-- Разделитель -->
      <div class="border-t border-gray-200 dark:border-gray-700"></div>

      <!-- Дополнительная информация -->
      <div class="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
        <div class="flex items-center gap-1">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>{{ new Date(travel.createdAt).toLocaleDateString('ru-RU') }}</span>
        </div>
        
        <!-- Слот для кнопок действий -->
        <div class="flex gap-1">
          <slot name="actions" :travel="travel" />
        </div>
      </div>
    </div>

    <!-- Эффект свечения при наведении -->
    <div class="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-blue-400/50 dark:group-hover:ring-blue-500/50 transition-all duration-300 pointer-events-none"></div>
  </div>
</template>

<style scoped>
/* Дополнительные стили для плавных анимаций */
@media (prefers-reduced-motion: reduce) {
  .group {
    transform: none !important;
    transition: none !important;
  }
  
  img {
    transform: none !important;
    transition: none !important;
  }
}
</style>
