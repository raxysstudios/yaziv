<script setup lang="ts">
import type { Mapping } from '~/utils/types';

const props = defineProps({
  mappings: Array as PropType<Mapping[]>,
  reverse: Function as PropType<() => void>,
});
const { locale } = useI18n();

const fromModel = defineModel<string>('from', { required: true });
const toModel = defineModel<string>('to', { required: true });

const items = computed(() => props.mappings?.map(m => ({
  value: m.id,
  label: tDict(m.name, locale.value)
})));
</script>

<template>
  <div class="flex gap-2 items-center">
    <UTooltip :text="$t('lang.input_mapping')">
      <USelect v-model="fromModel" class="flex-1 min-w-0" variant="ghost" :items="items" :content="{
        align: 'center',
        side: 'bottom'
      }" :aria-label="$t('lang.input_mapping')" />
    </UTooltip>

    <UTooltip :text="$t('lang.reverse')">
      <UButton icon="i-material-symbols-swap-horiz-rounded" variant="ghost"
        class="z-10 scale-105 hover:scale-110 active:scale-100 rounded-full shrink-0" :aria-label="$t('lang.reverse')"
        @click="reverse" />
    </UTooltip>

    <UTooltip :text="$t('lang.output_mapping')">
      <USelect v-model="toModel" class="flex-1 min-w-0" variant="ghost" :items="items" :content="{
        align: 'center',
        side: 'bottom'
      }" :aria-label="$t('lang.output_mapping')" />
    </UTooltip>
  </div>
</template>
