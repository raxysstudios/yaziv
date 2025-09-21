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
const langName = computed(() => {
  const lang = getLangById(langId.value);
  return tDict(lang?.name, locale.value);
});

const { data: converter } = useConverter(langId);

const from = ref('');
const to = ref('');

watch(converter, (converter) => {
  if (!converter) return;
  from.value = converter.config.defaultPair[0];
  to.value = converter.config.defaultPair[1];
}, {
  immediate: true
});

// watch([from, to], ([from, to]) => {
//   const url = router.resolve({
//     path: router.currentRoute.value.path,
//     query: { from, to },
//   }).fullPath;

//   useCookie('lastUrl').value = url;
// }, {
//   immediate: true
// });

const input = queryState(ref(''), 'text');
const showPairs = ref(false);

const selectedMappings = computed(() => ({
  from: converter.value?.mappingById(from.value),
  to: converter.value?.mappingById(to.value)
}));

const output = computed(() => chainConvert(
  input.value,
  selectedMappings.value.from,
  selectedMappings.value.to
));

const placeholders = computed(() => {
  const defaultFromMapping = converter.value?.mappingById(
    converter.value?.config.defaultPair[0] || ''
  );
  const sample = converter.value?.config.sample ?? '';
  const convertedSample = chainConvert(sample, defaultFromMapping, undefined);

  return {
    from: chainConvert(
      convertedSample,
      undefined,
      selectedMappings.value.from
    ),
    to: chainConvert(
      convertedSample,
      undefined,
      selectedMappings.value.to
    )
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

useSeoMeta({
  title: t('lang.seo.title', {
    lang: langName.value,
  }),
  description: t('lang.seo.description', {
    lang: langName.value,
    scripts: converter.value?.mappings
      ?.map(m => tDict(m.name, locale.value)).join(', ') || '',
  }),
});
</script>

<template>
  <AppHeader link="/home" icon="i-material-symbols-menu-rounded" :badge="langName" />
  <AppSegment v-if="converter">
    <ConverterControls v-model:from="from" v-model:to="to" :mappings="converter.mappings" @reverse="reverse" />

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
