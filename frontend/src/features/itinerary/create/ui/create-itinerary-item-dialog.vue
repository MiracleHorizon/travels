<script setup lang="ts">
import { ref, computed } from 'vue';
import { ItineraryApi } from '@/entities/itinerary';
import type { Place } from '@/entities/place';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  Label,
  Input,
  Field,
  FieldLabel,
  FieldContent,
  FieldDescription,
} from '@/shared/ui';
import { Plus, Clock, Navigation } from 'lucide-vue-next';

interface Props {
  travelId: string;
  dayNumber: number;
  places: Place[];
  existingItemsCount: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  created: [];
}>();

const open = ref(false);
const isLoading = ref(false);
const error = ref<string | null>(null);

// Форма
const selectedPlaceId = ref('');
const startTime = ref('09:00');
const endTime = ref('10:00');
const notes = ref('');
const travelTimeToNext = ref<number>(0);

// Доступные места (которые еще не добавлены в маршрут)
const availablePlaces = computed(() => {
  return props.places;
});

const selectedPlace = computed(() => {
  return props.places.find(p => p.id === selectedPlaceId.value);
});

const resetForm = () => {
  selectedPlaceId.value = '';
  startTime.value = '09:00';
  endTime.value = '10:00';
  notes.value = '';
  travelTimeToNext.value = 0;
  error.value = null;
};

const handleSubmit = async () => {
  if (!selectedPlaceId.value) {
    error.value = 'Выберите место';
    return;
  }

  if (!startTime.value || !endTime.value) {
    error.value = 'Укажите время начала и окончания';
    return;
  }

  const place = selectedPlace.value;
  if (!place) return;

  isLoading.value = true;
  error.value = null;

  try {
    await ItineraryApi.create(props.travelId, {
      placeId: place.id,
      placeName: place.name,
      dayNumber: props.dayNumber,
      startTime: startTime.value,
      endTime: endTime.value,
      notes: notes.value || undefined,
      travelTimeToNext: travelTimeToNext.value > 0 ? travelTimeToNext.value : undefined,
      order: props.existingItemsCount,
    });

    emit('created');
    open.value = false;
    resetForm();
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Ошибка при создании элемента маршрута';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button size="sm" class="gap-2">
        <Plus class="w-4 h-4" />
        Добавить место
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Добавить место в маршрут</DialogTitle>
        <DialogDescription>
          День {{ dayNumber }}. Добавьте место и укажите время посещения.
        </DialogDescription>
      </DialogHeader>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Выбор места -->
        <Field>
          <FieldLabel>Место</FieldLabel>
          <FieldContent>
            <select
              v-model="selectedPlaceId"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Выберите место</option>
              <option 
                v-for="place in availablePlaces" 
                :key="place.id" 
                :value="place.id"
              >
                {{ place.name }}
              </option>
            </select>
          </FieldContent>
          <FieldDescription>
            Выберите место из списка мест для посещения
          </FieldDescription>
        </Field>

        <!-- Время -->
        <div class="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel class="flex items-center gap-2">
              <Clock class="w-4 h-4" />
              Начало
            </FieldLabel>
            <FieldContent>
              <Input
                v-model="startTime"
                type="time"
                required
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel class="flex items-center gap-2">
              <Clock class="w-4 h-4" />
              Окончание
            </FieldLabel>
            <FieldContent>
              <Input
                v-model="endTime"
                type="time"
                required
              />
            </FieldContent>
          </Field>
        </div>

        <!-- Время в пути -->
        <Field>
          <FieldLabel class="flex items-center gap-2">
            <Navigation class="w-4 h-4" />
            Время в пути до следующего места (минуты)
          </FieldLabel>
          <FieldContent>
            <Input
              v-model.number="travelTimeToNext"
              type="number"
              min="0"
              placeholder="0"
            />
          </FieldContent>
          <FieldDescription>
            Оценка времени на перемещение до следующей точки маршрута
          </FieldDescription>
        </Field>

        <!-- Заметки -->
        <Field>
          <FieldLabel>Заметки (опционально)</FieldLabel>
          <FieldContent>
            <textarea
              v-model="notes"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Дополнительная информация о посещении..."
            />
          </FieldContent>
        </Field>

        <!-- Ошибка -->
        <div v-if="error" class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p class="text-sm text-red-600 dark:text-red-400">{{ error }}</p>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            @click="open = false"
            :disabled="isLoading"
          >
            Отмена
          </Button>
          <Button
            type="submit"
            :disabled="isLoading || !selectedPlaceId"
          >
            <span v-if="isLoading">Добавление...</span>
            <span v-else>Добавить</span>
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
