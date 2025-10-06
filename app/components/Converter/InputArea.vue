<script setup lang="ts">
import type { Mapping } from '~/utils/types';

const { t } = useI18n();

const props = defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  mapping: Object as PropType<Mapping>,
  maxLength: {
    type: Number,
    default: 2000
  }
});

const inputModel = defineModel<string>({ required: true });

// Watch for max length constraint
watch(inputModel, (value) => {
  if (value && value.length > props.maxLength) {
    inputModel.value = value.substring(0, props.maxLength);
  }
}, { flush: 'post' });

function clearInput() {
  inputModel.value = '';
}
</script>

<template>
  <TextToolbars class="flex-1">
    <UTextarea v-model="inputModel" class="flex-1 native" autoresize variant="none" size="xl" :placeholder="placeholder"
      :dir="mapping?.rtl ? 'rtl' : 'auto'" />

    <template #v-bar>
      <UTooltip :delay-duration="0" :text="t('lang.clear')">
        <UButton v-if="inputModel.length" icon="i-material-symbols-close-rounded" @click="clearInput" />
      </UTooltip>
    </template>

    <template #h-bar>
      <slot />

      <div class="flex-1" />

      <span v-if="maxLength - inputModel.length < 100" class="text-xs opacity-50">
        {{ inputModel.length }} / {{ maxLength }}
      </span>
    </template>
  </TextToolbars>
</template>
