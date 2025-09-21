<script setup lang="ts">
import { getLangById } from '~/utils/langs';
import { useTextConverter } from '~/composables/useTextConverter';
import { uploadFile, downloadFile } from '~/utils/file-manager';

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

function handleFileUpload() {
  uploadFile((content, name) => {
    const output = converter.convert(content);
    const mappingName = tDict(
      converter.outputMapping.value?.name, locale.value
    );
    downloadFile(output, `${name} — ${mappingName}`);
  });
}

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
    <ConverterControls v-model:from="converter.inputMappingId.value" v-model:to="converter.outputMappingId.value"
      :mappings="converter.mappings.value" :reverse="converter.reverse" />

    <div class="flex flex-col gap-2 md:flex-row">
      <ConverterInputArea v-model="converter.input.value" :placeholder="converter.inputSample.value"
        :mapping="converter.inputMapping.value">
        <UTooltip :delay-duration="0" :text="t('lang.file')">
          <UButton icon="i-material-symbols-upload-file-rounded" @click="handleFileUpload" />
        </UTooltip>
      </ConverterInputArea>

      <ConverterOutputArea :value="converter.output.value" :placeholder="converter.outputSample.value"
        :mapping="converter.outputMapping.value" :from-mapping="converter.inputMapping.value">
        <UTooltip :delay-duration="0" :text="t('lang.pairs')">
          <UButton icon="i-material-symbols-info-rounded" :variant="showPairs ? 'subtle' : 'ghost'"
            @click="showPairs = !showPairs" />
        </UTooltip>
      </ConverterOutputArea>
    </div>

    <div class="flex flex-row justify-center my-2">
      <ConverterPairsList v-if="showPairs && converter.inputMapping.value && converter.outputMapping.value"
        :from="converter.inputMapping.value" :to="converter.outputMapping.value" :convert="converter.convert"
        class="sm:w-2/3" />
    </div>
  </AppSegment>
</template>
