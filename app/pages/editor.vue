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

const placeholders = [
    'т t\nчь ćh\nя æ\n я  йа\n...',
    'ят чья',
    'yat ćhæ',
]
const pairs = computed(() => {
    const pairs = pairsInput.value
        .split('\n')
        .map(line => {
            const match = line.trimEnd().match(/^(\s*\S+)\s(\s*\S+)$/);
            if (match) {
                return [match[1], match[2]] as [string, string];
            }
            return ['', ''] as [string, string];
        })
        .filter(([from, to]) => from && to);

    return pairs;
});

function reverse() {
    const currOutput = output.value;
    pairsInput.value = pairs.value.map(([from, to]) => `${to} ${from}`).join('\n');
    input.value = currOutput;
}

const input = ref('');
const MAX_INPUT = 1000;
watch(input, (val) => {
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
            pairsInput.value = arr.map(([a, b]) => `${a} ${b}`).join('\n');
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

const { t } = useI18n();
useSeoMeta({
    title: t('editor.seo.title'),
    description: t('editor.seo.description'),
});
</script>

<template>
    <AppHeader link="/home" :badge="$t('editor.badge')">
        <NuxtLink to="https://github.com/raxysstudios/yaziv#-contributing-new-languages" target="_blank">
            <UTooltip :delay-duration="0" :text="$t('editor.contribution_guide')">
                <UButton icon="i-material-symbols-help-rounded" />
            </UTooltip>
        </NuxtLink>
    </AppHeader>
    <AppSegment>
        <div class="flex flex-col gap-4 md:flex-row">
            <div class="flex-1 flex flex-col gap-2">
                <Labeled :label="$t('editor.pairs')">
                    <UTextarea v-model="pairsInput" :placeholder="placeholders[0]" :rows="12" class="native" />
                </Labeled>
                <div class="flex gap-2">
                    <UButton @click="reverse" icon="i-material-symbols-swap-horiz-rounded"
                        :aria-label="$t('lang.reverse')" />
                    <div class="flex-1" />
                    <UButton size="sm" @click="pairsFromJson">
                        {{ $t('editor.from_json') }}
                    </UButton>
                    <UButton size="sm" @click="pairsToJson">
                        {{ $t('editor.to_json') }}
                    </UButton>
                    <NuxtLink
                        to="https://github.com/raxysstudios/yaziv/blob/49fdc2d6eb505c2ae83827455fc2270b528f29d8/app/data/langs/xdq/mappings/ipa.json#L8C12-L185C4"
                        target="_blank">
                        <UTooltip :delay-duration="0" :text="$t('editor.example')">
                            <UButton icon="i-material-symbols-open-in-new-rounded" />
                        </UTooltip>
                    </NuxtLink>
                </div>
            </div>
            <div class="flex-1 flex flex-col gap-2">
                <Labeled :label="$t('editor.input')">
                    <UTextarea v-model="input" class="native" :maxlength="MAX_INPUT"
                        :placeholder="pairsInput ? '' : placeholders[1]" :rows="6" />
                </Labeled>
                <Labeled :label="$t('editor.output')">
                    <UTextarea :value="output" :placeholder="pairsInput ? '' : placeholders[2]" class="native"
                        variant="subtle" readonly :rows="6" />
                </Labeled>
            </div>
        </div>
    </AppSegment>
</template>
