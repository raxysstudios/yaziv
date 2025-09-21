<script setup lang="ts">
import type { Mapping } from '~/utils/types';
import { processFile } from '~/utils/file-manager';

const props = defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  mapping: Object as PropType<Mapping>,
  toMapping: Object as PropType<Mapping>,
  maxLength: {
    type: Number,
    default: 2000
  }
});

const { t } = useI18n();

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

function handleFileUpload() {
  processFile(props.mapping, props.toMapping);
}
</script>

<template>
  <TextToolbarArea class="flex-1">
    <UTextarea v-model="inputModel" class="flex-1 native" autoresize variant="none" size="xl" :placeholder="placeholder"
      :dir="mapping?.rtl ? 'rtl' : 'auto'" />

    <template #v-bar>
      <UButton v-if="inputModel.length" icon="i-material-symbols-close" @click="clearInput" />
    </template>

    <template #h-bar>
      <UTooltip :delay-duration="0" :text="t('lang.file')">
        <UButton icon="i-material-symbols-upload-file-outline" @click="handleFileUpload" />
      </UTooltip>

      <div class="flex-1" />

      <span v-if="maxLength - inputModel.length < 100" class="text-xs opacity-50">
        {{ inputModel.length }} / {{ maxLength }}
      </span>
    </template>
  </TextToolbarArea>
</template>
