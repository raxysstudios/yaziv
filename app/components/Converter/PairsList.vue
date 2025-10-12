<script setup lang="ts">
import type { Mapping, Pairs } from '~/utils/types';

const props = defineProps<{
    from: Mapping
    to: Mapping
    convert: (text: string) => string
}>()

const mergedPairs = computed(() => {
    let pairs = [] as Pairs;
    if (props.from.pairs.length) {
        pairs = props.from.pairs.map(([a, b]) => [
            a,
            props.convert(b)
        ]);
    } else if (props.to.pairs.length) {
        pairs = props.to.pairs.map(([a, b]) => [b, a]);
    }
    return pairs.filter(([a, b]) => a !== b);
}
);
</script>

<template>
    <div class="flex native justify-center flex-row flex-wrap gap-1 text-sm">
        <div v-for="p in mergedPairs" class="flex px-1.5 rounded-sm bg-elevated/75">
            <span class="text-dimmed">
                {{ p[0].replaceAll(' ', '·') }}
            </span>
            <span>&nbsp;</span>
            <span>
                {{ p[1].replaceAll(' ', '·') }}
            </span>
        </div>
    </div>
</template>
