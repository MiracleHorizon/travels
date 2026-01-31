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
import { getLocalTimeZone, today } from '@internationalized/date'
import { CalendarDays, Tag } from 'lucide-vue-next'

import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { TravelApi } from '@/entities/travel';

const router = useRouter();

const emit = defineEmits<{
  created: [];
}>();

const isOpen = ref(false);
const isLoading = ref(false);
const error = ref<string | null>(null);

const start = today(getLocalTimeZone())
const end = start.add({ days: 7 })
const dateRange = ref({
  start,
  end,
})

const formData = reactive({
  destination: "",
})

const tags = ref<string[]>([])

const createTravel = async () => {
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
    const createdTravel = await TravelApi.create({
      destination: formData.destination,
      startDate: dateRange.value.start.toString(),
      endDate: dateRange.value.end.toString(),
      tags: tags.value,
    });

    // Сброс формы
    formData.destination = '';
    tags.value = [];
    const newStart = today(getLocalTimeZone());
    const newEnd = newStart.add({ days: 7 });
    dateRange.value = { start: newStart, end: newEnd };

    isOpen.value = false;
    emit('created');

    // Навигация на страницу созданного путешествия
    router.push(`/travels/${createdTravel.id}`);
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Ошибка при создании путешествия';
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button>
        Новое путешествие
      </Button>
    </DialogTrigger>

    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Новое путешествие
        </DialogTitle>

        <DialogDescription>
          Спланируйте незабываемое путешествие или сохраните память о прошедшем
        </DialogDescription>
      </DialogHeader>

      <div>
        <form @submit.prevent="createTravel">
          <FieldGroup>
            <Field>
              <FieldLabel>
                Направление
              </FieldLabel>
              <Input v-model="formData.destination" type="text" placeholder="Сеул, Республика Корея"
                :disabled="isLoading" />
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
                    <RangeCalendar v-model="dateRange" :week-starts-on="1" :number-of-months="2" :maximum-days="365"
                      locale="ru-RU" />
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
                Добавьте теги для категоризации путешествия (например: пляж, горы, культура)
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

        <Button size="sm" @click="createTravel" :disabled="isLoading">
          {{ isLoading ? 'Создание...' : 'Создать' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
