<script setup lang="ts">
import { Button, Input, RangeCalendar, Popover, PopoverTrigger, PopoverContent, DialogDescription } from '@/shared/ui';
import {
  Dialog, DialogTrigger, DialogHeader,
  DialogContent, DialogFooter, DialogTitle, DialogClose
} from '@/shared/ui';
import {
  FieldGroup, Field, FieldLabel, FieldDescription
} from '@/shared/ui';
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText
} from '@/shared/ui';
import { parseDate } from '@internationalized/date'
import { CalendarDays, Pencil, Tag } from 'lucide-vue-next'

import { reactive, ref, watch } from 'vue';
import type { DateRange } from 'reka-ui';
import { TravelApi, type Travel } from '@/entities/travel';

interface Props {
  travel: Travel;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  updated: [];
}>();

const isOpen = ref(false);
const isLoading = ref(false);
const error = ref<string | null>(null);

const dateRange = ref<DateRange>({
  start: parseDate(props.travel.startDate),
  end: parseDate(props.travel.endDate),
})

const formData = reactive({
  destination: props.travel.destination,
})

const tags = ref<string[]>([...props.travel.tags])

// Сброс формы при открытии
watch(isOpen, (newValue) => {
  if (newValue) {
    formData.destination = props.travel.destination;
    tags.value = [...props.travel.tags];
    dateRange.value = {
      start: parseDate(props.travel.startDate),
      end: parseDate(props.travel.endDate),
    };
    error.value = null;
  }
});

const updateTravel = async () => {
  if (!formData.destination.trim()) {
    error.value = 'Укажите направление';
    return;
  }

  if (!dateRange.value.start || !dateRange.value.end) {
    error.value = 'Выберите даты';
    return;
  }

  isLoading.value = true;
  error.value = null;

  try {
    await TravelApi.update(props.travel.id, {
      destination: formData.destination,
      startDate: dateRange.value.start.toString(),
      endDate: dateRange.value.end.toString(),
      tags: tags.value,
    });

    isOpen.value = false;
    emit('updated');
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Ошибка при обновлении путешествия';
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button variant="secondary" size="icon">
        <Pencil :size="16" />
      </Button>
    </DialogTrigger>

    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Редактировать путешествие
        </DialogTitle>

        <DialogDescription>
          Измените детали вашего путешествия
        </DialogDescription>
      </DialogHeader>

      <div>
        <form @submit.prevent="updateTravel">
          <FieldGroup>
            <Field>
              <FieldLabel>
                Направление
              </FieldLabel>
              <Input 
                v-model="formData.destination" 
                type="text" 
                placeholder="Сеул, Республика Корея"
                :disabled="isLoading"
              />
            </Field>

            <Field>
              <FieldLabel>
                Временные рамки
              </FieldLabel>

              <div class="flex items-center gap-x-2.5">
                <FieldDescription class="w-full">
                  {{ dateRange.start }} - {{ dateRange.end }}
                </FieldDescription>

                <Popover>
                  <PopoverTrigger as-child>
                    <Button variant="secondary" size="icon" :disabled="isLoading">
                      <CalendarDays />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent side="bottom" class="w-content p-0">
                    <!-- @ts-ignore - DateRange type mismatch with CalendarDate -->
                    <RangeCalendar v-model="dateRange" :number-of-months="2" :maximum-days="365" locale="ru-RU" />
                  </PopoverContent>
                </Popover>
              </div>
            </Field>

            <Field>
              <FieldLabel class="flex items-center gap-2">
                <Tag class="w-4 h-4" />
                Теги
              </FieldLabel>
              <FieldDescription class="mb-2">
                Добавьте теги для категоризации путешествия
              </FieldDescription>
              <TagsInput v-model="tags" :disabled="isLoading">
                <TagsInputItem v-for="item in tags" :key="item" :value="item">
                  <TagsInputItemText />
                  <TagsInputItemDelete />
                </TagsInputItem>
                <TagsInputInput placeholder="Добавить тег..." />
              </TagsInput>
            </Field>

            <div v-if="error" class="text-sm text-red-500">
              {{ error }}
            </div>
          </FieldGroup>
        </form>
      </div>

      <DialogFooter>
        <DialogClose as-child>
          <Button size="sm" variant="secondary" :disabled="isLoading">
            Отмена
          </Button>
        </DialogClose>

        <Button size="sm" @click="updateTravel" :disabled="isLoading">
          {{ isLoading ? 'Сохранение...' : 'Сохранить' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
