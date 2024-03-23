<script setup lang="ts">
import useLang from '~/composables/lang';

import { chainConvert } from '~/utils/converter';

const { lang } = await useLang();
const converter = ref<ConverterConfig>();
const from = ref<Mapping>();
const to = ref<Mapping>()
const showPairs = ref(false);

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
});

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
        <WorkArea>
          <UTextarea v-model="input" autoresize variant="none" :padded="false" size="xl"
            :placeholder="placeholders.from" />
          <template #v-bar>
            <UButton class="flex-none" icon="i-heroicons-x-mark" variant="ghost" @click="clear" />
          </template>
          <template #h-bar>
            <UButton class="flex-none" icon="i-heroicons-document-arrow-up" variant="ghost" @click="clear" />
          </template>
        </WorkArea>
        <WorkArea>
          <UTextarea v-model="output" autoresize disabled variant="none" :padded="false" color="gray" size="xl"
            :placeholder="placeholders.to" :ui="{ base: 'disabled:!cursor-text' }" />
          <template #v-bar>
            <UButton class="flex-none" icon="i-heroicons-clipboard-document" variant="ghost" @click="copyToClipboard" />
          </template>
          <template #h-bar>
            <UButton class="flex-none" icon="i-heroicons-information-circle" variant="ghost"
              @click="showPairs = !showPairs" />
          </template>
        </WorkArea>
      </div>
      <UModal v-model="showPairs">
        <PairsList :from="from" :to="to" />
      </UModal>
    </div>
  </div>
</template>
