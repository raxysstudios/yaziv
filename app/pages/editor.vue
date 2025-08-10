<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { convert } from '~/utils/converter';

onMounted(() => {
    pairsInput.value = localStorage.getItem('editor-pairs') || '';
    input.value = localStorage.getItem('editor-input') || '';
});

const pairsInput = ref('');
watch(pairsInput, (val) => {
    localStorage.setItem('editor-pairs', val);
}, {
    flush: 'post'
});

const pairs = computed(() => {
    const pairs = pairsInput.value
        .split('\n')
        .map(line => line.trim().split('.') as [string, string])
        .filter(([from, to]) => from && to);

    return pairs;
});

const input = ref('');
watch(input, (val) => {
    const MAX_INPUT = 1000;
    if (val.length > MAX_INPUT) {
        input.value = val.substring(0, MAX_INPUT);
    }

    localStorage.setItem('editor-input', input.value);
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
    prompt('JSON array of the pairs:', json);
}
</script>

<template>
    <Scaffold link="/menu" badge="[editor]">
        <div class="flex flex-col gap-6 md:flex-row">
            <div class="flex-1 flex flex-col gap-1">
                <label class="font-medium text-sm">Conversion pairs</label>
                <UTextarea v-model="pairsInput" class="native" highlight="false" autoresize
                    :placeholder="'чь.ćh\nя.æ\n...'" />
                <div class="flex gap-1">
                    <UButton @click="pairsFromJson" icon="i-heroicons-bars-3-bottom-left">From
                        JSON</UButton>
                    <UButton @click="pairsToJson" icon="i-heroicons-code-bracket-square">To
                        JSON</UButton>
                </div>
            </div>
            <div class="flex-1 flex flex-col gap-1">
                <label class="font-medium text-sm">Input text</label>
                <UTextarea v-model="input" class="native" :maxlength="MAX_INPUT" placeholder="Enter text..." />
                <label class="font-medium text-sm">Output</label>
                <UTextarea :value="output" class="native" color="gray" readonly />
            </div>
        </div>
    </Scaffold>
</template>
