<script setup lang="ts">
import type { Mapping } from '~/utils/types';

const { t } = useI18n();

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
  <TextToolbars class="bg-elevated/50 flex-1">
    <UTextarea :model-value="value" class="flex-1 native" autoresize readonly size="xl" variant="none"
      :placeholder="placeholder" :dir="mapping?.rtl ? 'rtl' : 'auto'" />

    <template #v-bar>
      <UTooltip v-if="value" :text="t('lang.copy')">
        <UButton icon="i-material-symbols-content-copy-rounded" :aria-label="t('lang.copy')" @click="copyToClipboard" />
      </UTooltip>
    </template>

    <template #h-bar>
      <slot />
    </template>
  </TextToolbars>
</template>
