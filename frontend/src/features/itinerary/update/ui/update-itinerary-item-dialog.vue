<script setup lang="ts">
import { ref, watch } from 'vue';
import { ItineraryApi } from '@/entities/itinerary';
import type { ItineraryItem } from '@/entities/itinerary';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  Input,
  Field,
  FieldLabel,
  FieldContent,
  FieldDescription,
} from '@/shared/ui';
import { Pencil, Clock, Navigation } from 'lucide-vue-next';

interface Props {
  item: ItineraryItem;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  updated: [];
}>();

const open = ref(false);
const isLoading = ref(false);
const error = ref<string | null>(null);

// Форма
const startTime = ref(props.item.startTime);
const endTime = ref(props.item.endTime);
const notes = ref(props.item.notes || '');
const travelTimeToNext = ref(props.item.travelTimeToNext || 0);

// Сброс формы при открытии
watch(open, (isOpen) => {
  if (isOpen) {
    startTime.value = props.item.startTime;
    endTime.value = props.item.endTime;
    notes.value = props.item.notes || '';
    travelTimeToNext.value = props.item.travelTimeToNext || 0;
    error.value = null;
  }
});

const handleSubmit = async () => {
  if (!startTime.value || !endTime.value) {
    error.value = 'Укажите время начала и окончания';
    return;
  }

  isLoading.value = true;
  error.value = null;

  try {
    await ItineraryApi.update(props.item.id, {
      startTime: startTime.value,
      endTime: endTime.value,
      notes: notes.value || undefined,
      travelTimeToNext: travelTimeToNext.value > 0 ? travelTimeToNext.value : undefined,
    });

    emit('updated');
    open.value = false;
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Ошибка при обновлении элемента маршрута';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button variant="ghost" size="icon" class="h-8 w-8">
        <Pencil class="w-4 h-4" />
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Редактировать время посещения</DialogTitle>
        <DialogDescription>
          {{ item.placeName }}
        </DialogDescription>
      </DialogHeader>

      <form @submit.prevent="handleSubmit" class="space-y-6">
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
            :disabled="isLoading"
          >
            <span v-if="isLoading">Сохранение...</span>
            <span v-else>Сохранить</span>
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
