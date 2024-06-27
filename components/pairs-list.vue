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
        <p v-for="p in mergedPairs" class="bg-slate-100 rounded-sm px-1">
            {{ p[0] }} <span class="opacity-50">{{ p[1] }}</span>
        </p>
    </div>
</template>
