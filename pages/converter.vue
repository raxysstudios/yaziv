<script setup lang="ts">
import useLang from '~/composables/lang';

import { chainConvert } from '~/utils/converter';
import { ref } from 'vue';


const { lang } = await useLang();
const converter = ref<ConverterConfig>();
const from = ref<Mapping>();
const to = ref<Mapping>()
const showPairs = ref(false);
const route = useRoute()


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
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/'
  }]
]



</script>

<template>
  <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
  <div class="w-full flex justify-center p-3 py-5 md:p-5 lg:p-10">
    <div v-if="converter"
      class="flex flex-col w-full  lg:w-2/3 min-h-80  shadow-twenty max-w-5xl overflow-clip  rounded-lg">
      <div class="flex justify-self-center   focus:bg-gray-100">
        <USelectMenu class="flex-1 ring-0" v-model="from" :options="converter?.mappings" option-attribute="name" :ui="{

          rounded: 'rounded-none', color: { white: { outline: 'focus:ring-0 shadow-none border-b outline-none ring-0 ring-shadow-none hover:bg-green-50 transition-all duration-150 text-center' } }, base: '!cursor-pointer !justify-center',

        }"
          :ui-menu="{ rounded: 'rounded-none', option: { rounded: 'rounded-none', base: 'cursor-pointer', selected: 'font-bold', padding: 'p-2' }, ring: 'ring-0', padding: 'p-0', }"
          :popper="{ offsetDistance: 0, arrow: false }" size="xl" trailing-icon="false" />
        <UButton icon="i-heroicons-arrows-right-left" variant="ghost" @click="reverse" size="lg" class="border-b"
          :ui="{ rounded: 'rounded-none' }" />

        <USelectMenu class="flex-1 ring-0" v-model="to" :options="converter?.mappings" option-attribute="name" :ui="{

          rounded: 'rounded-none', color: { white: { outline: 'focus:ring-0 shadow-none border-b outline-none ring-0 ring-shadow-none hover:bg-green-50 transition-all duration-150 text-center' } }, base: '!cursor-pointer !justify-center',

        }"
          :ui-menu="{ rounded: 'rounded-none', option: { rounded: 'rounded-none', base: 'cursor-pointer', selected: 'font-bold', padding: 'p-2' }, ring: 'ring-0', padding: 'p-0', }"
          :popper="{ offsetDistance: 0, arrow: false }" size="xl" trailing-icon="false" />

      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-1 h-full">
        <WorkArea class="flex-1 p-2 ">
          <UTextarea v-model="input" autoresize variant="none" :padded="false" size="xl"
            :placeholder="placeholders.from" class="w-full" />
          <template #v-bar>
            <UButton class="flex-none" icon="i-heroicons-x-mark" variant="ghost" @click="clear" />
          </template>
          <template #h-bar>
            <UButton class="flex-none" icon="i-heroicons-document-arrow-up" variant="ghost" @click="clear" size="xl" />
          </template>
        </WorkArea>
        <WorkArea class="flex-1 p-2 bg-gray-100">
          <UTextarea v-model="output" autoresize disabled variant="none" :padded="false" color="gray" size="xl"
            :placeholder="placeholders.to" :ui="{ base: 'disabled:!cursor-text' }" class="w-full" />
          <template #v-bar>
            <UButton class="flex-none" icon="i-heroicons-clipboard-document" variant="ghost" @click="copyToClipboard" />
          </template>
          <template #h-bar>
            <UButton class="flex-none" icon="i-heroicons-information-circle" variant="ghost" size="xl"
              @click="showPairs = !showPairs" />
          </template>
        </WorkArea>
      </div>
      <UModal v-model="showPairs" :ui="{ container: 'items-center lg:items-end' }">
        <PairsList :from="from" :to="to" />
      </UModal>
    </div>
  </div>
</template>
