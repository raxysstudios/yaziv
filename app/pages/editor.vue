<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { convert } from '~/utils/converter';

const pairsInput = ref('');
const pairs = computed(() => {
    return pairsInput.value
        .split('\n')
        .map(line => line.trim().split('.') as [string, string])
        .filter(([from, to]) => from && to);
});

const input = ref('');
const MAX_INPUT = 1000;
watch(input, (val) => {
    if (val.length > MAX_INPUT) {
        input.value = val.substring(0, MAX_INPUT);
    }
}, {
    flush: 'post'
});

const output = computed(() => {
    return convert(input.value, pairs.value);
});
</script>

<template>
    <Scaffold link="/menu" badge="[EDITOR]" icon="i-heroicons-bars-3">
        <div class="columns-2">
            <div>
                <label class="font-bold">Conversion pairs:</label>
                <textarea v-model="pairsInput" rows="6" class="w-full border rounded p-2 font-mono"
                    :placeholder="'a.b\nc.d\n...'" />
            </div>
            <div>
                <label class="font-bold">Input text:</label>
                <input v-model="input" :maxlength="MAX_INPUT" class="w-full border rounded p-2"
                    placeholder="Enter text..." />
                <label class="font-bold">Output:</label>
                <textarea :value="output" class="w-full border rounded p-2 bg-gray-100" rows="3" readonly />
            </div>
        </div>
    </Scaffold>
</template>
