<script setup lang="ts">
import useLang from '~/composables/lang';

import { chainConvert } from '~/utils/converter';

const { lang } = await useLang();
const converter = ref<ConverterConfig>();
const from = ref<Mapping>();
const to = ref<Mapping>()

watch(lang, async (val) => {
  if (!val) return;
  converter.value = await $fetch<ConverterConfig>(
    `/langs/${val}/converter.json`
  ).catch(() => undefined);
  if (converter.value) {
    from.value = converter.value.mappings[0];
    to.value = converter.value.mappings[1];
  }
}, {
  immediate: true
})


const placeholders = computed(() => {
  const sample = chainConvert(
    converter.value?.sample ?? '',
    converter.value?.mappings[0], undefined
  );
  return {
    from: chainConvert(sample, undefined, from.value),
    to: chainConvert(sample, undefined, to.value)
  };
});
const input = ref('');
const output = computed(() => chainConvert(
  input.value, from.value, to.value
));
// const showMapping = ref(false);

function copyToClipboard() {
  navigator.clipboard.writeText(output.value);
}

function reverse() {
  [from.value, to.value] = [to.value, from.value];
  input.value = output.value;
}

function clear() {
  input.value = '';
}
</script>

<template>
  <div class="w-full flex justify-center p-1">
    <div v-if="converter" class="flex flex-col gap-1 w-1/2">
      <div class="flex justify-self-center gap-1">
        <USelectMenu class="flex-1" v-model="from" :options="converter?.mappings" option-attribute="name" />
        <UButton icon="i-heroicons-arrows-right-left" variant="ghost" @click="reverse" />
        <USelectMenu class="flex-1" v-model="to" :options="converter?.mappings" option-attribute="name" />
      </div>
      <div class="flex flex-row gap-1">
        <div class="flex flex-1 flex-col gap-1">
          <UTextarea v-model="input" size="xl" :placeholder="placeholders.from" />
          <div class="flex flex-row gap-1">
            <!-- <UButton class="flex-none" icon="i-heroicons-document-arrow-up" variant="ghost" @click="clear" /> -->
            <UButton class="flex-none" icon="i-heroicons-trash" variant="ghost" @click="clear" />
          </div>
        </div>
        <div class="flex flex-1 flex-col gap-1">
          <UTextarea v-model="output" disabled variant="none" color="gray" size="xl" :placeholder="placeholders.to"
            :ui="{ base: 'disabled:!cursor-text' }" />
          <div class="flex flex-row gap-1">
            <div class="flex-1" />
            <UButton class="flex-none" icon="i-heroicons-clipboard-document" variant="ghost" @click="copyToClipboard" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
