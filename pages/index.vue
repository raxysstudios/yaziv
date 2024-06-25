<script setup lang="ts">
import useLang from '~/composables/lang';

import { chainConvert } from '~/utils/converter';
import { processFile } from '~/utils/file-manager';

definePageMeta({
  middleware: ['lang']
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

const router = useRouter();
watchEffect(() => {
  const fromIndex = converter.value?.mappings.findIndex(
    (m) => m.name == from.value?.name
  ) ?? -1;
  const toIndex = converter.value?.mappings.findIndex(
    (m) => m.name == to.value?.name
  ) ?? -1;
  if (fromIndex < 0 || toIndex < 0) return;
  router.push({
    path: "/", query: {
      lang: lang.value,
      from: fromIndex,
      to: toIndex,
    }
  });
});
const route = useRoute();
watch(route, async (route) => {
  converter.value = await $fetch<ConverterConfig>(
    `/langs/${lang.value}/converter.json`
  ).catch(() => undefined);
  if (!converter.value) return;

  let fromIndex = route.query["from"] as unknown as number | undefined;
  from.value = converter.value.mappings[
    fromIndex === undefined ? converter.value.default?.[0] ?? 0 : fromIndex
  ];
  let toIndex = route.query["to"] as unknown as number | undefined;
  to.value = converter.value.mappings[
    toIndex === undefined ? converter.value.default?.[1] ?? 1 : toIndex
  ];
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
        <USelectMenu class="flex-1" v-model="from" :options="converter?.mappings" option-attribute="name" />
        <div>
          <UButton icon="i-heroicons-arrows-right-left" color="gray" variant="solid" size="lg" class="pop"
            @click="reverse" />
        </div>
        <USelectMenu class="flex-1" v-model="to" :options="converter?.mappings" option-attribute="name" />
      </div>
      <div class="flex gap-2">
        <WorkArea class="flex-1">
          <UTextarea class="flex-1" v-model="input" autoresize variant="none" size="xl"
            :placeholder="placeholders.from" />
          <template #v-bar>
            <UButton icon="i-heroicons-x-mark" variant="ghost" @click="input = ''" />
          </template>
          <template #h-bar>
            <UButton icon="i-heroicons-document-arrow-up" variant="ghost" @click="processFile(from, to)" />
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
        <PairsList v-if="showPairs" :from="from" :to="to" class="sm:w-2/3" />
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
