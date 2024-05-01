<script setup lang="ts">
import type { Mapping } from '~/utils/types';
import { chainConvert } from '~/utils/converter';

const props = defineProps<{
  from?: Mapping
  to?: Mapping
}>()

const mergedPairs = computed(() =>
  props.from
    ? props.from.pairs.map(([a, b]) =>
      [a, chainConvert(b, props.from, props.to)])
    : []
);

const showMerged = ref(false);
</script>

<template>
  <div class="flex flex-row gap-1 p-4">
    <div class="flex justify-center flex-row flex-wrap gap-1 text-md">
      <p v-for="p in mergedPairs" class="bg-slate-100 rounded-md px-1">
        {{ p[0] }} <span class="opacity-50">{{ p[1] }}</span>
      </p>
    </div>
  </div>
</template>