<script setup lang="ts">
import useLang from '~/composables/lang';

import { chainConvert } from '~/utils/converter';
import { computed, ref, watch } from 'vue';
import type { ConverterConfig, Lang, Mapping } from '~/utils/types';


const { lang, currLang, allLangs } = await useLang();
const converter = ref<ConverterConfig>();
const from = ref<Mapping>();
const to = ref<Mapping>()
const showPairs = ref(false);
const currentl = ref<string>('');



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

const marginLeft = ref(0);

watch(marginLeft, (newValue, oldValue) => {
  console.log(`Margin left changed from ${oldValue} to ${newValue}`);
});

let links: any[] = [];

onMounted(() => {
  const converterContainer = document.getElementById('converter');
  const rect = converterContainer?.getBoundingClientRect();
  marginLeft.value = rect?.left ?? 0;

  const currLangValue = currLang.value.charAt(0).toUpperCase() + currLang.value.slice(1);

  links = [
    [{
      label: `Converter`,
      icon: 'i-heroicons-arrow-left',
      badge: currLangValue,
    }]
  ]
})

const showMerged = ref(true);
const home = '/'


</script>

<template>
  <NuxtLink :to="home" class="w-full ">
    <UHorizontalNavigation :links="links"
      class="border-gray-200 dark:border-gray-800 border-b w-full flex lg:justify-center hover:bg-gray-100"
      :ui="{ container: 'w-2/3  ', inner: 'w-full ', base: `gap-2 items-center justify-start md:ml-3 `, badge: { base: 'items-center ml-0' }, before: 'hover:before:bg-transparent' }" />
  </NuxtLink>

  <div class="w-full  flex flex-col items-center  px-2  py-2">
    <div v-if="converter" class="flex flex-col w-full lg:w-2/3  max-w-5xl   rounded-lg">
      <div class="flex gap-2 justify-self-center focus:bg-gray-100 mb-2">
        <USelectMenu class="flex-1 ring-0 capitalize" v-model="from" :options="converter?.mappings"
          option-attribute="name" :ui="{

            rounded: 'rounded-none rounded-t-md', color: { white: { outline: 'focus:ring-0 shadow-none border-none outline-none ring-0 ring-shadow-none hover:bg-green-50 transition-all duration-150 text-center' } }, base: '!cursor-pointer !justify-center font-bold capitalize', trailing: { padding: { xl: 'pe-3.5' } }
          }"
          :ui-menu="{ rounded: 'rounded-none rounded-b-md ', option: { rounded: 'rounded-none', base: 'cursor-pointer justify-center', selected: 'font-bold pe-2', padding: 'p-2', icon: { base: 'hidden' }, selectedIcon: { base: 'hidden' } }, ring: 'ring-0', padding: 'p-0', }"
          :popper="{ offsetDistance: 0, arrow: false }" size="xl" trailing-icon="false" selected-icon="none" />

        <UButton icon="i-heroicons-arrows-right-left" variant="ghost" @click="reverse" size="lg" class="border-none"
          :ui="{ rounded: 'rounded' }" />

        <USelectMenu class="flex-1 ring-0 capitalize" v-model="to" :options="converter?.mappings"
          option-attribute="name" :ui="{

            rounded: 'rounded-none rounded-t-md', color: { white: { outline: 'focus:ring-0 shadow-none border-none outline-none ring-0 ring-shadow-none hover:bg-green-50 transition-all duration-150 text-center' } }, base: '!cursor-pointer !justify-center font-bold capitalize', trailing: { padding: { xl: 'pe-3.5' } }
          }"
          :ui-menu="{ rounded: 'rounded-none rounded-b-md ', option: { rounded: 'rounded-none', base: 'cursor-pointer justify-center', selected: 'font-bold pe-2', padding: 'p-2', icon: { base: 'hidden' }, selectedIcon: { base: 'hidden' } }, ring: 'ring-0', padding: 'p-0', }"
          :popper="{ offsetDistance: 0, arrow: false }" size="xl" trailing-icon="false" selected-icon="none" />

      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 h-full flex-grow">
        <WorkArea class="flex-1 p-2 h-full border rounded-lg">
          <UTextarea v-model="input" autoresize variant="none" :rows="8" :padded="false" size="xl"
            :placeholder="placeholders.from" class="w-full h-full" :ui="{ base: 'h- full' }" />
          <template #v-bar>
            <UButton class="flex-none" icon="i-heroicons-x-mark" variant="ghost" @click="clear" />
          </template>
          <template #h-bar>
            <UButton class="flex-none" icon="i-heroicons-document-arrow-up" variant="ghost"
              @click=" processFile(from, to)" />
          </template>
        </WorkArea>
        <WorkArea class="flex-1 p-2 border bg-gray-100 rounded-lg">
          <UTextarea v-model="output" disabled autoresize variant="none" :padded="false" :rows="8" color="gray"
            size="xl" :placeholder="placeholders.to" :ui="{ base: 'disabled:!cursor-text, h-full' }"
            class="w-full h-full" />
          <template #v-bar>
            <UButton class="flex-none" icon="i-heroicons-clipboard-document" variant="ghost" @click="copyToClipboard" />
          </template>
          <template #h-bar>
            <UButton class="flex-none" icon="i-heroicons-information-circle" variant="ghost"
              @click="showPairs = !showPairs" v-show="from && from?.pairs.length > 0" />
          </template>
        </WorkArea>
      </div>

    </div>
    <div class="flex justify-center items-center w-full lg:w-2/3 mt-2 p-2 gap-2"
      :class="{ 'display': showPairs, 'hidden': !showPairs }">

      <UToggle v-model="showMerged" @click="showMerged = !showMerged" />
      <span>merged</span>
    </div>




    <PairsList :from="from" :to="to" class=" w-full  lg:w-1/2 m-auto"
      :class="{ 'display': showPairs, 'hidden': !showPairs }" v-show="from && from?.pairs.length > 0" />
  </div>

</template>
