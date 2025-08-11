<script setup lang="ts">
import useLang from '~/composables/lang';
import queryState from '~/composables/url-query';

import { chainConvert } from '~/utils/converter';
import { processFile } from '~/utils/file-manager';
import type { ConverterConfig } from '~/utils/types';

const { langParam, langName } = useLang();
const route = useRoute();

onMounted(async () => {
  if (langName) {
    await initConverter();
  }
  if (!converter.value) {
    navigateTo('/home');
    return;
  }

  useSeoMeta({
    title: $t('file_upload', {
      lang: langName
    }),
    description: $t('file_upload', {
      lang: langName,
      scripts: converter.value?.mappings.map(m => m.name).join(', '),
    }),
  })

  watch(() => route.fullPath, () => {
    localStorage.setItem('lastUrl', route.fullPath);
  }, {
    immediate: true,
  });
});

const converter = ref<ConverterConfig>();
const from = queryState(ref(0), 'from');
const to = queryState(ref(1), 'to');
async function initConverter() {
  converter.value = await $fetch<ConverterConfig>(
    `/langs/${langParam}/converter.json`
  ).then((c) => {
    c.mappings.forEach((m, i) => {
      (<any>m).i = i;
      (<any>m).label = m.name;
    });
    return c;
  });
  if (!converter.value) return;
}

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

const input = queryState(ref(''), 'text');
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
  <AppHeader link="/home" icon="i-material-symbols-menu" :badge="langName" />
  <AppSegment v-if="converter">
    <div class="flex top-bar gap-1">
      <USelect class="flex-1" v-model="from" :items="converter?.mappings" option-attribute="name" value-key="i"
        :content="{
          align: 'center',
          side: 'bottom'
        }" />
      <div>
        <UButton icon="i-material-symbols-swap-horiz" variant="subtle"
          class="transition hover:scale-105 active:scale-100 rounded-full" size="xl" @click="reverse" />
      </div>
      <USelect class="flex-1" v-model="to" :items="converter?.mappings" option-attribute="name" value-key="i" :content="{
        align: 'center',
        side: 'bottom'
      }" />
    </div>
    <div class="flex flex-col gap-2 md:flex-row">
      <TextToolbarArea class="flex-1">
        <UTextarea class="flex-1 native" v-model="input" autoresize variant="none" size="xl"
          :placeholder="placeholders.from" :dir="mappings.from?.rtl ? 'rtl' : 'auto'" />
        <template #v-bar>
          <UButton v-if="input.length" icon="i-material-symbols-close" @click="input = ''" />
        </template>
        <template #h-bar>
          <UTooltip :delay-duration="0" :text="$t('lang.file')">
            <UButton icon="i-material-symbols-upload-file-outline" @click="processFile(mappings.from, mappings.to)" />
          </UTooltip>
          <div class="flex-1" />
          <span v-if="MAX_INPUT - input.length < 100" class="text-xs opacity-50">
            {{ input.length }} / {{ MAX_INPUT }}
          </span>
        </template>
      </TextToolbarArea>
      <TextToolbarArea class="bg-gray-50 flex-1">
        <UTextarea class="flex-1 native" v-model="output" autoresize readonly size="xl" variant="none"
          :placeholder="placeholders.to" :dir="mappings.to?.rtl ? 'rtl' : 'auto'" />
        <template #v-bar>
          <UButton v-if="input.length" icon="i-material-symbols-content-copy-outline" @click="copyToClipboard" />
        </template>
        <template #h-bar>
          <UTooltip :delay-duration="0" :text="$t('lang.pairs')">
            <UButton icon="i-material-symbols-info-outline" :variant="showPairs ? 'subtle' : 'ghost'"
              @click="showPairs = !showPairs" />
          </UTooltip>
        </template>
      </TextToolbarArea>
    </div>
    <div class="flex flex-row justify-center my-2">
      <PairsList v-if="showPairs" :from="mappings.from" :to="mappings.to" class="sm:w-2/3" />
    </div>
  </AppSegment>
</template>

<style>
.top-bar {

  > :nth-child(2) {
    @apply relative;

    > :only-child {
      @apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10;
    }
  }
}
</style>
