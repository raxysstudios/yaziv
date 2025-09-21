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

const { t } = useI18n();

const showPairs = defineModel<boolean>('showPairs', { required: true });

function copyToClipboard() {
  navigator.clipboard.writeText(props.value);
}

function togglePairs() {
  showPairs.value = !showPairs.value;
}
</script>

<template>
  <TextToolbarArea class="bg-gray-50 flex-1">
    <UTextarea :model-value="value" class="flex-1 native" autoresize readonly size="xl" variant="none"
      :placeholder="placeholder" :dir="mapping?.rtl ? 'rtl' : 'auto'" />

    <template #v-bar>
      <UButton v-if="value" icon="i-material-symbols-content-copy-outline" @click="copyToClipboard" />
    </template>

    <template #h-bar>
      <UTooltip :delay-duration="0" :text="t('lang.pairs')">
        <UButton icon="i-material-symbols-info-outline" :variant="showPairs ? 'subtle' : 'ghost'"
          @click="togglePairs" />
      </UTooltip>
    </template>
  </TextToolbarArea>
</template>
