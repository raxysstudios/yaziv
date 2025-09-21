<script setup lang="ts">
import { getLangById } from '~/utils/langs';
import { useTextConverter } from '~/composables/useTextConverter';

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

const converter = useTextConverter(langId);

const showPairs = ref(false);

useSeoMeta({
  title: t('lang.seo.title', {
    lang: langName.value,
  }),
  description: t('lang.seo.description', {
    lang: langName.value,
    scripts: converter.mappings.value
      ?.map(m => tDict(m.name, locale.value)).join(', ') || '',
  }),
});
</script>

<template>
  <AppHeader link="/home" icon="i-material-symbols-menu-rounded" :badge="langName" />
  <AppSegment v-if="converter.config">
    <ConverterControls v-model:from="converter.state.inputMappingId" v-model:to="converter.state.outputMappingId"
      :mappings="converter.mappings.value" :reverse="converter.reverse" />

    <div class="flex flex-col gap-2 md:flex-row">
      <ConverterInputArea v-model="converter.state.input" :placeholder="converter.inputSample.value"
        :mapping="converter.inputMapping.value" :to-mapping="converter.outputMapping.value" />

      <ConverterOutputArea :value="converter.output.value" :placeholder="converter.outputSample.value"
        :mapping="converter.outputMapping.value" v-model:show-pairs="showPairs"
        :from-mapping="converter.inputMapping.value" />
    </div>

    <div class="flex flex-row justify-center my-2">
      <PairsList v-if="showPairs" :from="converter.inputMapping.value" :to="converter.outputMapping.value"
        class="sm:w-2/3" />
    </div>
  </AppSegment>
</template>
