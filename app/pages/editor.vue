<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { convert } from '~/utils/converter';
import queryState from '~/composables/url-query';

const pairsInput = queryState(ref(''), 'pairs', '');
const pairs = computed(() => {
    return pairsInput.value
        .split('\n')
        .map(line => line.trim().split('.') as [string, string])
        .filter(([from, to]) => from && to);
});

const input = queryState(ref(''), 'text', '');
watch(input, (val) => {
    const MAX_INPUT = 1000;
    if (val.length > MAX_INPUT) {
        input.value = val.substring(0, MAX_INPUT);
    }
}, {
    flush: 'post'
});

const output = computed(() => {
    return convert(input.value, pairs.value);
});

function pairsFromJson() {
    const json = prompt('Paste JSON array of pairs:');
    if (!json) return;
    try {
        const arr = JSON.parse(json);
        if (Array.isArray(arr) && arr.every(p => Array.isArray(p) && p.length === 2)) {
            pairsInput.value = arr.map(([a, b]) => `${a}.${b}`).join('\n');
        } else {
            alert('Invalid JSON format.');
        }
    } catch {
        alert('Invalid JSON.');
    }
}

function pairsToJson() {
    const json = JSON.stringify(pairs.value);
    prompt('JSON array of pairs:', json);
}
</script>

<template>
    <Scaffold link="/menu" badge="[EDITOR]" icon="i-heroicons-bars-3">
        <div class="columns-2">
            <div>
                <label class="font-bold">Conversion pairs:</label>
                <div class="flex gap-2 mb-2">
                    <button type="button" class="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200"
                        @click="pairsFromJson">From JSON</button>
                    <button type="button" class="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200"
                        @click="pairsToJson">To JSON</button>
                </div>
                <textarea v-model="pairsInput" rows="6" class="w-full border rounded p-2 font-mono"
                    :placeholder="'чь.ćh\nя.æ\n...'" />
            </div>
            <div>
                <label class="font-bold">Input text:</label>
                <textarea v-model="input" :maxlength="MAX_INPUT" class="w-full border rounded p-2"
                    placeholder="Enter text..." />
                <label class="font-bold">Output:</label>
                <textarea :value="output" class="w-full border rounded p-2 bg-gray-100" rows="3" readonly />
            </div>
        </div>
    </Scaffold>
</template>
