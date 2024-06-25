<script setup lang="ts">
import useLang from '~/composables/lang';
import queryState from '~/composables/url-query';

import { chainConvert } from '~/utils/converter';
import { processFile } from '~/utils/file-manager';

const { lang, allLangs } = useLang();
const title = computed(() => {
  return allLangs
    .find(l => l.id == lang.value)
    ?.name ?? '<ERROR>';
});

const converter = ref<ConverterConfig>();
const from = ref(0);
const to = ref(1);
watch(lang, async (lang) => {
  if (!lang) return;
  converter.value = await $fetch<ConverterConfig>(
    `/langs/${lang}/converter.json`
  ).then((c) => {
    c.mappings.forEach((m, i) => {
      (<any>m).i = i;
    });
    return c;
  });
  if (!converter.value) return;
  queryState(from, 'from', converter.value.default?.[0] ?? 0);
  queryState(to, 'to', converter.value.default?.[1] ?? 1);
}, {
  immediate: true
});

const mappings = computed(() => {
  const all = converter.value?.mappings ?? [];
  return {
    all,
    from: all[from.value],
    to: all[to.value]
  };
}
);
const showPairs = ref(false);

const placeholders = computed(() => {
  const sample = chainConvert(
    converter.value?.sample ?? '',
    mappings.value.all[converter.value?.default?.[0] ?? 0],
    undefined
  );
  return {
    from: chainConvert(
      sample,
      undefined,
      mappings.value.from
    ),
    to: chainConvert(
      sample,
      undefined,
      mappings.value.to
    )
  };
});
const input = ref('');
const output = computed(() => chainConvert(
  input.value,
  mappings.value.from,
  mappings.value.to,
));

function copyToClipboard() {
  navigator.clipboard.writeText(output.value);
}
function reverse() {
  const text = output.value;
  [from.value, to.value] = [to.value, from.value];
  input.value = text;
}
</script>

<template>
  <div v-if="lang" class="w-full flex flex-col items-center">
    <AppHeader link="/menu" icon="i-heroicons-bars-3" :title="title" />
    <UDivider />
    <div v-if="converter" class="work-c flex flex-col gap-2 my-2 items-stretch">
      <div class="flex top-bar gap-1">
        <USelectMenu class="flex-1" v-model="from" :options="converter?.mappings" option-attribute="name"
          value-attribute="i" />
        <div>
          <UButton icon="i-heroicons-arrows-right-left" color="gray" variant="solid" size="lg" class="pop"
            @click="reverse" />
        </div>
        <USelectMenu class="flex-1" v-model="to" :options="converter?.mappings" option-attribute="name"
          value-attribute="i" />
      </div>
      <div class="flex flex-col gap-2 md:flex-row">
        <WorkArea class="flex-1">
          <UTextarea class="flex-1" v-model="input" autoresize variant="none" size="xl"
            :placeholder="placeholders.from" />
          <template #v-bar>
            <UButton icon="i-heroicons-x-mark" variant="ghost" @click="input = ''" />
          </template>
          <template #h-bar>
            <UButton icon="i-heroicons-document-arrow-up" variant="ghost"
              @click="processFile(mappings.from, mappings.to)" />
          </template>
        </WorkArea>
        <WorkArea class="bg-gray-50 flex-1">
          <UTextarea class="flex-1" v-model="output" autoresize disabled color="gray" size="xl" variant="none"
            :placeholder="placeholders.to" :ui="{ base: '!cursor-text' }" />
          <template #v-bar>
            <UButton icon="i-heroicons-clipboard-document" variant="ghost" @click="copyToClipboard" />
          </template>
          <template #h-bar>
            <UButton icon="i-heroicons-information-circle" :variant="showPairs ? 'solid' : 'ghost'"
              @click="showPairs = !showPairs" />
          </template>
        </WorkArea>
      </div>
      <div class="flex flex-row justify-center my-2">
        <PairsList v-if="showPairs" :from="mappings.from" :to="mappings.to" class="sm:w-2/3" />
      </div>
    </div>
  </div>
</template>

<style>
.top-bar {

  > :nth-child(2) {
    @apply relative;

    > :only-child {
      @apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10;
      @apply rounded-full;
    }
  }
}
</style>
