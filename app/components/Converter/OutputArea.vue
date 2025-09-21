<script setup lang="ts">
import type { Mapping } from '~/utils/types';

const props = defineProps({
  value: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  mapping: Object as PropType<Mapping>,
  fromMapping: Object as PropType<Mapping>
});


function copyToClipboard() {
  navigator.clipboard.writeText(props.value);
}
</script>

<template>
  <TextToolbarArea class="bg-neutral-100 dark:bg-neutral-800 flex-1">
    <UTextarea :model-value="value" class="flex-1 native" autoresize readonly size="xl" variant="none"
      :placeholder="placeholder" :dir="mapping?.rtl ? 'rtl' : 'auto'" />

    <template #v-bar>
      <UButton v-if="value" icon="i-material-symbols-content-copy-rounded" @click="copyToClipboard" />
    </template>

    <template #h-bar>
      <slot />
    </template>
  </TextToolbarArea>
</template>
