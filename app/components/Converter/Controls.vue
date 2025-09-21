<script setup lang="ts">
import type { Mapping } from '~/utils/types';

defineProps({
  mappings: Array as PropType<Mapping[]>
});

defineEmits<{
  (e: 'reverse'): void;
}>();

const { locale } = useI18n();

const fromModel = defineModel<string>('from', { required: true });
const toModel = defineModel<string>('to', { required: true });
</script>

<template>
  <div class="flex gap-3">
    <USelect v-model="fromModel" class="flex-1" :items="mappings" value-key="id" :content="{
      align: 'center',
      side: 'bottom'
    }">
      <template #item-label="{ item }">
        {{ tDict(item.name, locale) }}
      </template>
      {{ fromModel }}
    </USelect>

    <div class="relative">
      <UButton icon="i-material-symbols-swap-horiz-rounded" variant="subtle"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 hover:scale-105 active:scale-100 rounded-full"
        size="lg" @click="$emit('reverse')" />
    </div>

    <USelect v-model="toModel" class="flex-1" :items="mappings" value-key="id" :content="{
      align: 'center',
      side: 'bottom'
    }">
      <template #item-label="{ item }">
        {{ tDict(item.name, locale) }}
      </template>
      {{ toModel }}
    </USelect>
  </div>
</template>
