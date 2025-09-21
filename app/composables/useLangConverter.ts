import type { LanguageConfig, Mapping } from '~/utils/types';

export async function useLangConverter(langId: string) {
  const { locale } = useI18n();

  const { data: langConfig } = await useAsyncData(
    `lang-config-${langId}`,
    () => import(`~/data/langs/${langId}/config.json`) as Promise<LanguageConfig>
  );

  const { data: mappings } = await useAsyncData(
    `lang-mappings-${langId}`,
    async () => {
      if (!langConfig.value) return [];

      const mappings: Mapping[] = [];
      for (const mappingId of langConfig.value.mappings) {
        let mapping = await import(`~/data/langs/${langId}/mappings/${mappingId}.json`);

        mapping.label = tDict(mapping.name, locale);
        mappings.push(mapping);
      }
      return mappings;
    }
  );

  const getMappingById = (id: string) => {
    return mappings.value?.find(m => m.id === id) || mappings.value?.[0];
  };

  return {
    langConfig: readonly(langConfig),
    mappings,
    getMappingById
  };
}
