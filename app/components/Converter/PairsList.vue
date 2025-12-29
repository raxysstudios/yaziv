<script setup lang="ts">
import type { Mapping } from '~/utils/types';

const props = defineProps<{
  from: Mapping
  to: Mapping
  convert: (text: string) => string
}>()

const mergedPairs = computed(() => {
  let pairs = [] as [string, string][];
  if (props.from.pairs.length) {
    pairs = props.from.pairs
      .map(([a]) => [a, props.convert(a)]);
  } else if (props.to.pairs.length) {
    pairs = props.to.pairs
      .filter(([, , ct]) => ct != '>')
      .map(([a, b]) => [b, a]);
  }
  return pairs.map(
    p => p.map(e => e.replaceAll(' ', '·'))
  );
});
</script>

<template>
  <div class="flex native justify-center flex-row flex-wrap gap-1 text-sm">
    <div v-for="p in mergedPairs" class="flex px-1.5 rounded-sm bg-elevated/75">
      <span class="text-dimmed">{{ p[0] }}</span>
      <span>&nbsp;</span>
      <span>{{ p[1] }}</span>
    </div>
  </div>
</template>
