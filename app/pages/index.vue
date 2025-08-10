<script setup lang="ts">
import useLang from '~/composables/lang';
import queryState from '~/composables/url-query';

import { chainConvert } from '~/utils/converter';
import { processFile } from '~/utils/file-manager';

definePageMeta({
  layout: 'app'
})

const { lang } = useLang();
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
    from: chainConvert(sample, undefined, mappings.value.from),
    to: chainConvert(sample, undefined, mappings.value.to)
  };
});

const input = queryState(ref(''), 'text', '');
const MAX_INPUT = 2000;
watch(input, (val) => {
  if (val.length > MAX_INPUT) {
    input.value = val.substring(0, MAX_INPUT);
  }
}, {
  flush: 'post'
})

const output = computed(() => chainConvert(
  input.value,
  mappings.value.from,
  mappings.value.to,
));

function copyToClipboard() {
  navigator.clipboard.writeText(output.value);
}
function reverse() {
  const router = useRouter();
  const route = router.currentRoute.value;
  router.replace({
    path: route.path,
    query: {
      ...route.query,
      text: output.value,
      to: from.value,
      from: to.value
    }
  })
}
</script>

<template>
  <div v-if="converter" class="work-c flex flex-col gap-2 items-stretch">
    <div class="flex top-bar gap-1">
      <USelectMenu class="flex-1" v-model="from" :options="converter?.mappings" option-attribute="name"
        value-attribute="i" />
      <div>
        <UButton icon="i-heroicons-arrows-right-left" variant="solid" size="lg" class="hover:scale-105 active:scale-100"
          @click="reverse" />
      </div>
      <USelectMenu class="flex-1" v-model="to" :options="converter?.mappings" option-attribute="name"
        value-attribute="i" />
    </div>
    <div class="flex flex-col gap-2 md:flex-row">
      <WorkArea class="flex-1">
        <UTextarea class="flex-1 native" v-model="input" autoresize variant="none" size="xl"
          :placeholder="placeholders.from" :dir="mappings.from.rtl ? 'rtl' : 'auto'" />
        <template #v-bar>
          <UButton v-if="input.length" icon="i-heroicons-x-mark" @click="input = ''" />
        </template>
        <template #h-bar>
          <UButton icon="i-heroicons-document-arrow-up" @click="processFile(mappings.from, mappings.to)" />
          <div class="flex-1" />
          <span v-if="MAX_INPUT - input.length < 100" class="text-xs opacity-50">
            {{ input.length }} / {{ MAX_INPUT }}
          </span>
        </template>
      </WorkArea>
      <WorkArea class="bg-gray-50 flex-1">
        <UTextarea class="flex-1 native" v-model="output" autoresize readonly size="xl" variant="none"
          :placeholder="placeholders.to" :dir="mappings.to.rtl ? 'rtl' : 'auto'" />
        <template #v-bar>
          <UButton v-if="input.length" icon="i-heroicons-clipboard-document" @click="copyToClipboard" />
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
