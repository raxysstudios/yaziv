<script setup lang="ts">
import { getLangById } from '~/utils/langs';
import queryState from '~/utils/url-query';
import { chainConvert } from '~/utils/converter';

definePageMeta({
  middleware: 'guard-lang'
});

const { t, locale } = useI18n();

const router = useRouter();
const langId = computed(() => router.currentRoute.value.params.lang as string);

const {
  config,
  mappings,
  getMappingById
} = useLangConverter(langId);

const from = queryState(ref(config.value?.defaultPair[0] || ''), 'from');
const to = queryState(ref(config.value?.defaultPair[1] || ''), 'to');

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

const input = queryState(ref(''), 'text');
const showPairs = ref(false);

const selectedMappings = computed(() => ({
  from: getMappingById(from.value),
  to: getMappingById(to.value)
}));

const output = computed(() => chainConvert(
  input.value,
  selectedMappings.value.from,
  selectedMappings.value.to
));

const placeholders = computed(() => {
  const defaultFromMapping = getMappingById(config.value?.defaultPair[0] || '');
  const sample = config.value?.sample ?? '';
  const convertedSample = chainConvert(sample, defaultFromMapping, undefined);

  return {
    from: chainConvert(convertedSample, undefined, selectedMappings.value.from),
    to: chainConvert(convertedSample, undefined, selectedMappings.value.to)
  };
});

function reverse() {
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
  <AppHeader link="/home" icon="i-material-symbols-menu-rounded" :badge="langName" />
  <AppSegment v-if="config && mappings">
    <ConverterControls v-model:from="from" v-model:to="to" :mappings="mappings" @reverse="reverse" />

    <div class="flex flex-col gap-2 md:flex-row">
      <ConverterInputArea v-model="input" :placeholder="placeholders.from" :mapping="selectedMappings.from"
        :to-mapping="selectedMappings.to" />

      <ConverterOutputArea :value="output" :placeholder="placeholders.to" :mapping="selectedMappings.to"
        v-model:show-pairs="showPairs" :from-mapping="selectedMappings.from" />
    </div>

    <div class="flex flex-row justify-center my-2">
      <PairsList v-if="showPairs" :from="selectedMappings.from" :to="selectedMappings.to" class="sm:w-2/3" />
    </div>
  </AppSegment>
</template>
