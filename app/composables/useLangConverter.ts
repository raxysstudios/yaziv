import type { LanguageConfig, Mapping } from '~/utils/types';

export async function useLangConverter(langId: string) {
  const { locale } = useI18n();

  // Load both config and mappings in a single useAsyncData call
  const { data } = await useAsyncData(
    `lang-data-${langId}`,
    async () => {
      // Load config first
      const langConfig = await import(`~/data/langs/${langId}/config.json`) as LanguageConfig;

      // Then load mappings based on config
      const mappings: Mapping[] = [];
      for (const mappingId of langConfig.mappings) {
        let mapping = await import(`~/data/langs/${langId}/mappings/${mappingId}.json`);
        mapping.label = tDict(mapping.name, locale);
        mappings.push(mapping);
      }

      return { langConfig, mappings };
    }
  );

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
