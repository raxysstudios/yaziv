import type { LanguageConfig, Mapping } from '~/utils/types';

export function useLangConverter(langId: Ref<string>) {
  const { data } = useAsyncData(
    `lang-data-${langId.value}`,
    async () => {
      const langConfig = await import(`~/data/langs/${langId.value}/config.json`) as LanguageConfig;

      const mappings: Mapping[] = [];
      for (const mappingId of langConfig.mappings) {
        const mapping = await import(`~/data/langs/${langId.value}/mappings/${mappingId}.json`);
        mappings.push(mapping);
      }

      return { langConfig, mappings };
    }, {
    watch: [langId]
  });

  const langConfig = computed(() => data.value?.langConfig);
  const mappings = computed(() => data.value?.mappings);

  const getMappingById = (id: string) => {
    return mappings.value?.find(m => m.id === id) || mappings.value?.[0];
  };

  return {
    langConfig,
    mappings,
    getMappingById
  };
}
