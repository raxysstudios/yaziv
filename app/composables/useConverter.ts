import type { ConverterConfig, Mapping } from '~/utils/types';

export function useConverter(langId: Ref<string>) {
  return useAsyncData(
    `lang-${langId.value}`,
    async () => {
      const config: ConverterConfig = await import(
        `~/data/langs/${langId.value}/config.json`
      );

      const mappings: Mapping[] = [];
      for (const mappingId of config.mappings) {
        const mapping = await import(
          `~/data/langs/${langId.value}/mappings/${mappingId}.json`
        );
        mappings.push(mapping);
      }

      return {
        config,
        mappings,
        mappingById: (id: string) =>
          mappings.find(m => m.id === id) || mappings[0]
      };
    }, {
    watch: [langId]
  });
}
