import type { LanguageConfig, Mapping } from '~/utils/types';

export function useLangConverter(langId: Ref<string>) {
  const { data: config } = useAsyncData(
    `lang-config-${langId.value}`,
    async () => {
      return await import(`~/data/langs/${langId.value}/config.json`) as LanguageConfig;
    }, {
    watch: [langId]
  });

  const { data: mappings } = useAsyncData(
    `lang-mappings-${langId.value}`,
    async () => {
      if (!config.value) return [];

      const mappings: Mapping[] = [];
      for (const mappingId of config.value.mappings) {
        const mapping = await import(`~/data/langs/${langId.value}/mappings/${mappingId}.json`);
        mappings.push(mapping);
      }
      return mappings;
    }, {
    watch: [langId, config]
  });

  const getMappingById = (id: string) => {
    return mappings.value?.find(m => m.id === id) || mappings.value?.[0];
  };

  return {
    config,
    mappings,
    getMappingById
  };
}
