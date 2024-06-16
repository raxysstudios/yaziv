<script setup lang="ts">
import useLang from '~/composables/lang';

import { chainConvert } from '~/utils/converter';
import { processFile } from '~/utils/file-manager';

definePageMeta({
  middleware: ['lang',],
});

const { lang, allLangs } = useLang();
const title = computed(() => {
  return allLangs
    .find(l => l.id == lang.value)
    ?.name ?? '<ERROR>';
});


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
</script>

<template>
  <div v-if="lang" class="w-full flex flex-col items-center">
    <AppHeader link="/menu" icon="i-heroicons-bars-3" :title="title" />
    <UDivider />
    <div v-if="converter" class="work-c flex flex-col gap-2 items-stretch">
      <div class="flex top-bar">
        <USelectMenu class="flex-1" v-model="from" :options="converter?.mappings" option-attribute="name" />
        <div>
          <UButton icon="i-heroicons-arrows-right-left" color="gray" variant="solid" size="lg" class="pop"
            @click="reverse" />
        </div>
        <USelectMenu class="flex-1" v-model="to" :options="converter?.mappings" option-attribute="name" />
      </div>
      <div class="flex gap-6">
        <WorkArea class="rring flex-1 p-2">
          <UTextarea class="flex-1" v-model="input" autoresize variant="none" size="xl" :padded="false"
            :placeholder="placeholders.from" />
          <template #v-bar>
            <UButton icon="i-heroicons-x-mark" variant="ghost" @click="input = ''" />
          </template>
          <template #h-bar>
            <UButton icon="i-heroicons-document-arrow-up" variant="ghost" @click="processFile(from, to)" />
          </template>
        </WorkArea>
        <WorkArea class="rring bg-gray-50 flex-1 p-2">
          <UTextarea class="flex-1" v-model="output" autoresize disabled color="gray" size="xl"
            variant="none" :padded="false" :placeholder="placeholders.to" :ui="{ base: '!cursor-text' }" />
          <template #v-bar>
            <UButton icon="i-heroicons-clipboard-document" variant="ghost" @click="copyToClipboard" />
          </template>
          <template #h-bar>
            <UButton icon="i-heroicons-information-circle" variant="ghost" @click="showPairs = !showPairs" />
          </template>
        </WorkArea>
      </div>
      <UModal v-model="showPairs">
        <PairsList :from="from" :to="to" />
      </UModal>
    </div>
  </div>
</template>

<style>
.rring {
  @apply ring-1 ring-inset ring-gray-300 rounded-md;
}

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
