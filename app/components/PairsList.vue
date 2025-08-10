<script setup lang="ts">
import type { Mapping } from '~/utils/types';
import { chainConvert } from '~/utils/converter';

const props = defineProps<{
    from?: Mapping
    to?: Mapping
}>()

const mergedPairs = computed(() => {
    let pairs = [] as [string, string][];
    if (props.from?.pairs.length) {
        pairs = props.from.pairs.map(([a, b]) => [
            a,
            chainConvert(b, props.from, props.to)
        ]);
    } else if (props.to?.pairs?.length) {
        pairs = props.to.pairs.map(([a, b]) => [b, a]);
    }
    return pairs.filter(([a, b]) => a !== b);
}
);
</script>

<template>
    <div class="flex native justify-center flex-row flex-wrap gap-1 text-sm">
        <div v-for="p in mergedPairs" class="flex border border-neutral-200 rounded-sm">
            <span class="px-1">{{ p[0] }}</span>
            <span class="px-1 bg-neutral-100">{{ p[1] }}</span>
        </div>
    </div>
</template>
