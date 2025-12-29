<script setup lang="ts">
import type { Mapping } from '~/utils/types';
import { chainConvert } from '~/utils/converter';

const props = defineProps<{
  from: Mapping
  to: Mapping
}>()

const mergedPairs = computed(() => {
  type Pair = [string, string];
  let pairs = [] as Pair[];

  pairs.push(...props.from.pairs
    .map(([a, b]) =>
      <Pair>[a, chainConvert(b, undefined, props.to)]
    )
  );
  pairs.push(...props.to.pairs
    .filter(([, , ct]) => ct != '>')
    .map(([a, b]) =>
      <Pair>[chainConvert(b, undefined, props.from), a]
    )
  );

  const keys = new Set<string>();
  pairs = pairs.filter(([a, b]) => {
    const key = `${a}\0${b}`;
    if (keys.has(key)) return false;
    keys.add(key);
    return true;
  });

  return pairs
    .sort((p1, p2) => p2[0].length - p1[0].length)
    .map(p => p.map(e => e.replaceAll(' ', '·')));
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
