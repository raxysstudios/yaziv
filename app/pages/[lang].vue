<script setup lang="ts">
import { getLangById } from '~/utils/langs';
import queryState from '~/utils/url-query';
import type { LanguageConfig, Mapping } from '~/utils/types';

import { chainConvert } from '~/utils/converter';
import { processFile } from '~/utils/file-manager';

definePageMeta({
  middleware: 'guard-lang'
});

const { t, locale } = useI18n();

// === DATA LOADING ===
const router = useRouter();
const langId = computed(() => router.currentRoute.value.params.lang as string);

// Load language configuration
const { data: langConfig } = await useAsyncData(
  `lang-config-${langId.value}`,
  () => import(`~/data/langs/${langId.value}/config.json`) as Promise<LanguageConfig>
);

// Load mappings with localized labels
const { data: mappings } = await useAsyncData(
  `lang-mappings-${langId.value}`,
  async () => {
    if (!langConfig.value) return [];

    const mappings: Mapping[] = [];
    for (const mappingId of langConfig.value.mappings) {
      let mapping = await import(`~/data/langs/${langId.value}/mappings/${mappingId}.json`);

      (<any>mapping).label = tDict(mapping.name, locale);
      mappings.push(mapping);
    }
    return mappings;
  }
);

// === MAPPING SELECTION ===
const getMappingById = (id: string) => {
  return mappings.value?.find(m => m.id === id) || mappings.value?.[0];
};

const getDefaultFromId = () => {
  const defaultIds = langConfig.value?.default;
  return defaultIds?.[0] || mappings.value?.[0]?.id || '';
};

const getDefaultToId = () => {
  const defaultIds = langConfig.value?.default;
  return defaultIds?.[1] || mappings.value?.[1]?.id || mappings.value?.[0]?.id || '';
};

const from = queryState(ref(getDefaultFromId()), 'from');
const to = queryState(ref(getDefaultToId()), 'to');

// Update defaults when data loads
watch([langConfig, mappings], () => {
  if (!from.value) from.value = getDefaultFromId();
  if (!to.value) to.value = getDefaultToId();
}, { immediate: true });

// === URL STATE MANAGEMENT ===
watch([from, to], ([from, to]) => {
  const route = router.currentRoute.value;
  const url = router.resolve({
    path: route.path,
    query: { from, to },
  }).fullPath;

  useCookie('lastUrl').value = url;
}, {
  immediate: true
});

// === COMPUTED VALUES ===
const selectedMappings = computed(() => {
  const all = mappings.value ?? [];
  return {
    all,
    from: getMappingById(from.value),
    to: getMappingById(to.value)
  };
});

const showPairs = ref(false);

const placeholders = computed(() => {
  const defaultFromMapping = getMappingById(getDefaultFromId());
  const sample = chainConvert(
    langConfig.value?.sample ?? '',
    defaultFromMapping,
    undefined
  );
  return {
    from: chainConvert(sample, undefined, selectedMappings.value.from),
    to: chainConvert(sample, undefined, selectedMappings.value.to)
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
  selectedMappings.value.from,
  selectedMappings.value.to,
));

// === ACTIONS ===
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

// === SEO ===
const langName = computed(() => {
  const lang = getLangById(langId.value);
  return tDict(lang?.name, locale.value);
});

useSeoMeta({
  title: t('lang.seo.title', {
    lang: langName.value,
  }),
  description: t('lang.seo.description', {
    lang: langName.value,
    scripts: mappings.value
      ?.map(m => tDict(m.name, locale.value)).join(', ') || '',
  }),
});
</script>

<template>
  <AppHeader link="/home" icon="i-material-symbols-menu" :badge="langName" />
  <AppSegment v-if="langConfig && mappings">
    <div class="flex gap-3">
      <USelect class="flex-1" v-model="from" :items="mappings" option-attribute="label" value-key="id"
        :content="{
          align: 'center',
          side: 'bottom'
        }" />
      <div class="relative">
        <UButton icon="i-material-symbols-swap-horiz" variant="subtle"
          class=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 hover:scale-105 active:scale-100 rounded-full"
          size="lg" @click="reverse" />
      </div>
      <USelect class="flex-1" v-model="to" :items="mappings" option-attribute="label" value-key="id" :content="{
        align: 'center',
        side: 'bottom'
      }" />
    </div>
    <div class="flex flex-col gap-2 md:flex-row">
      <TextToolbarArea class="flex-1">
        <UTextarea class="flex-1 native" v-model="input" autoresize variant="none" size="xl"
          :placeholder="placeholders.from" :dir="selectedMappings.from?.rtl ? 'rtl' : 'auto'" />
        <template #v-bar>
          <UButton v-if="input.length" icon="i-material-symbols-close" @click="input = ''" />
        </template>
        <template #h-bar>
          <UTooltip :delay-duration="0" :text="$t('lang.file')">
            <UButton icon="i-material-symbols-upload-file-outline" @click="processFile(selectedMappings.from, selectedMappings.to)" />
          </UTooltip>
          <div class="flex-1" />
          <span v-if="MAX_INPUT - input.length < 100" class="text-xs opacity-50">
            {{ input.length }} / {{ MAX_INPUT }}
          </span>
        </template>
      </TextToolbarArea>
      <TextToolbarArea class="bg-gray-50 flex-1">
        <UTextarea class="flex-1 native" v-model="output" autoresize readonly size="xl" variant="none"
          :placeholder="placeholders.to" :dir="selectedMappings.to?.rtl ? 'rtl' : 'auto'" />
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
      <PairsList v-if="showPairs" :from="selectedMappings.from" :to="selectedMappings.to" class="sm:w-2/3" />
    </div>
  </AppSegment>
</template>
