<script setup lang="ts">
import useLang from '~/composables/lang';

import { chainConvert } from '~/utils/converter';
import { computed, ref, watch } from 'vue';
import type { ConverterConfig, Mapping } from '~/utils/types';


const { lang, currentLang } = await useLang();
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


const links = [
  [{
    label: `Yaziv`,
    icon: 'i-heroicons-arrow-left',
    badge: currentLang.value?.name,
    // badge: lang.value,
    to: '/'
  }]
]

</script>

<template>
  <UHorizontalNavigation :links="links" class="border-gray-200 dark:border-gray-800 "
    :ui="{ container: 'lg:ml-[17%]', base: 'gap-2 items-center justify-center', badge: { base: 'items-center' } }" />
  <div class="w-full  flex flex-col items-center  px-2  py-2 md:p-5">
    <div v-if="converter" class="flex flex-col w-full lg:w-2/3  shadow-thirty max-w-5xl overflow-clip  rounded-lg">
      <div class="flex justify-self-center   focus:bg-gray-100">
        <USelectMenu class="flex-1 ring-0" v-model="from" :options="converter?.mappings" option-attribute="name" :ui="{

          rounded: 'rounded-none', color: { white: { outline: 'focus:ring-0 shadow-none border-b outline-none ring-0 ring-shadow-none hover:bg-green-50 transition-all duration-150 text-center' } }, base: '!cursor-pointer !justify-center',

        }"
          :ui-menu="{ rounded: 'rounded-none', option: { rounded: 'rounded-none', base: 'cursor-pointer', selected: 'font-bold', padding: 'p-2' }, ring: 'ring-0', padding: 'p-0' }"
          :popper="{ offsetDistance: 0, arrow: false }" size="xl" trailing-icon="false" />
        <UButton icon="i-heroicons-arrows-right-left" variant="ghost" @click="reverse" size="lg" class="border-b"
          :ui="{ rounded: 'rounded-none' }" />

        <USelectMenu class="flex-1 ring-0" v-model="to" :options="converter?.mappings" option-attribute="name" :ui="{

          rounded: 'rounded-none', color: { white: { outline: 'focus:ring-0 shadow-none border-b outline-none ring-0 ring-shadow-none hover:bg-green-50 transition-all duration-150 text-center' } }, base: '!cursor-pointer !justify-center',

        }"
          :ui-menu="{ rounded: 'rounded-none', option: { rounded: 'rounded-none', base: 'cursor-pointer w-full', selected: 'font-bold', padding: 'p-2' }, ring: 'ring-0', padding: 'p-0', }"
          :popper="{ offsetDistance: 0, arrow: false }" size="xl" trailing-icon="false" />

      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-1 h-full flex-grow">
        <WorkArea class="flex-1 p-2 h-full">
          <UTextarea v-model="input" autoresize variant="none" :rows="8" :padded="false" size="xl"
            :placeholder="placeholders.from" class="w-full h-full" :ui="{ base: 'h- full' }" />
          <template #v-bar>
            <UButton class="flex-none" icon="i-heroicons-x-mark" variant="ghost" @click="clear" />
          </template>
          <template #h-bar>
            <UButton class="flex-none" icon="i-heroicons-document-arrow-up" variant="ghost"
              @click=" processFile(from, to)" size="xl" />
          </template>
        </WorkArea>
        <WorkArea class="flex-1 p-2 bg-gray-100 ">
          <UTextarea v-model="output" disabled autoresize variant="none" :padded="false" :rows="8" color="gray"
            size="xl" :placeholder="placeholders.to" :ui="{ base: 'disabled:!cursor-text, h-full' }"
            class="w-full h-full" />
          <template #v-bar>
            <UButton class="flex-none" icon="i-heroicons-clipboard-document" variant="ghost" @click="copyToClipboard" />
          </template>
          <template #h-bar>
            <UButton class="flex-none" icon="i-heroicons-information-circle" variant="ghost" size="xl"
              @click="showPairs = !showPairs" v-show="from && from?.pairs.length > 0" />
          </template>
        </WorkArea>
      </div>
    </div>


    <PairsList :from="from" :to="to" class="border-t w-full  lg:w-1/2 m-auto"
      :class="{ 'display': showPairs, 'hidden': !showPairs }" />
  </div>

</template>
