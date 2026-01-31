<script setup lang="ts">
import { ref } from 'vue';
import { CreateTravelDialog } from '@/features/travel/create';
import { TravelList } from '@/widgets/travel-list';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui';

const upcomingListRef = ref<InstanceType<typeof TravelList>>();
const pastListRef = ref<InstanceType<typeof TravelList>>();
const archivedListRef = ref<InstanceType<typeof TravelList>>();

const handleTravelCreated = () => {
  upcomingListRef.value?.refresh();
  pastListRef.value?.refresh();
  archivedListRef.value?.refresh();
};
</script>

<template>
  <div class="container mx-auto p-6 space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold">Мои путешествия</h1>
      <CreateTravelDialog @created="handleTravelCreated" />
    </div>

    <Tabs default-value="upcoming" class="w-full">
      <TabsList>
        <TabsTrigger value="upcoming">
          Будущие
        </TabsTrigger>
        <TabsTrigger value="past">
          Прошедшие
        </TabsTrigger>
        <TabsTrigger value="archived">
          Архив
        </TabsTrigger>
      </TabsList>

      <TabsContent value="upcoming">
        <TravelList ref="upcomingListRef" status="upcoming" :show-archived="false" />
      </TabsContent>

      <TabsContent value="past">
        <TravelList ref="pastListRef" status="past" :show-archived="false" />
      </TabsContent>

      <TabsContent value="archived">
        <TravelList ref="archivedListRef" :show-archived="true" />
      </TabsContent>
    </Tabs>
  </div>
</template>
