<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Button, Input, DialogDescription } from '@/shared/ui';
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
import { Plus, Link as LinkIcon } from 'lucide-vue-next';
import { PlaceApi } from '@/entities/place';

interface Props {
  travelId: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  created: [];
}>();

const isOpen = ref(false);
const isLoading = ref(false);
const error = ref<string | null>(null);

const formData = reactive({
  name: '',
  comment: '',
});

const links = ref<string[]>([]);

const createPlace = async () => {
  if (!formData.name.trim()) {
    error.value = 'Укажите название места';
    return;
  }

  isLoading.value = true;
  error.value = null;

  try {
    await PlaceApi.create({
      travelId: props.travelId,
      name: formData.name,
      comment: formData.comment || undefined,
      links: links.value,
    });

    // Сброс формы
    formData.name = '';
    formData.comment = '';
    links.value = [];

    isOpen.value = false;
    emit('created');
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Ошибка при создании места';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button>
        <Plus class="w-4 h-4 mr-2" />
        Добавить место
      </Button>
    </DialogTrigger>

    <DialogContent class="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>
          Добавить место для посещения
        </DialogTitle>

        <DialogDescription>
          Укажите интересное место, которое хотите посетить
        </DialogDescription>
      </DialogHeader>

      <div>
        <form @submit.prevent="createPlace">
          <FieldGroup>
            <Field>
              <FieldLabel>
                Название места *
              </FieldLabel>
              <Input 
                v-model="formData.name" 
                type="text" 
                placeholder="Эйфелева башня"
                :disabled="isLoading"
              />
            </Field>

            <Field>
              <FieldLabel>
                Комментарий
              </FieldLabel>
              <FieldDescription class="mb-2">
                Добавьте заметки или описание места
              </FieldDescription>
              <textarea
                v-model="formData.comment"
                placeholder="Обязательно подняться на вершину на закате..."
                rows="3"
                :disabled="isLoading"
                class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </Field>

            <Field>
              <FieldLabel class="flex items-center gap-2">
                <LinkIcon class="w-4 h-4" />
                Ссылки
              </FieldLabel>
              <FieldDescription class="mb-2">
                Добавьте полезные ссылки (сайты, карты, бронирования)
              </FieldDescription>
              <TagsInput v-model="links" :disabled="isLoading">
                <TagsInputItem v-for="item in links" :key="item" :value="item">
                  <TagsInputItemText />
                  <TagsInputItemDelete />
                </TagsInputItem>
                <TagsInputInput placeholder="https://..." />
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

        <Button size="sm" @click="createPlace" :disabled="isLoading">
          {{ isLoading ? 'Создание...' : 'Создать' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
