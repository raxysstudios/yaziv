import type { Ref } from 'vue';
import type { Mapping, ConverterConfig } from '~/utils/types';
import { convert } from '~/utils/converter';

function chainConvert(text: string, from?: Mapping, to?: Mapping) {
  if (to?.lowercase) text = text.toLowerCase();
  if (from) text = convert(text, from.pairs);
  if (to) {
    const pairs = to.pairs.map((p) => p.slice().reverse()) as [string, string][];
    text = convert(text, pairs);
  }
  return text;
}

export function useTextConverter(langId: Ref<string>) {
  const { data: converterData } = useAsyncData(
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
        mappings
      };
    }, {
    watch: [langId]
  });

  const config = computed(() => converterData.value?.config);
  const mappings = computed(() => converterData.value?.mappings);
  function mappingById(id: string) {
    return mappings.value?.find(m => m.id === id);
  }

  const input = ref('');
  const output = computed(() =>
    convert(input.value)
  );
  const inputMappingId = ref('');
  const inputMapping = computed(() =>
    mappingById(inputMappingId.value)
  );
  const outputMappingId = ref('');
  const outputMapping = computed(() =>
    mappingById(outputMappingId.value)
  );

  watch(inputMapping, (newMapping, oldMapping) => {
    input.value = chainConvert(input.value, oldMapping, newMapping);
  });

  watch(config, (configData) => {
    if (!configData) return;
    inputMappingId.value ||= configData.defaultPair[0];
    outputMappingId.value ||= configData.defaultPair[1];
  }, {
    immediate: true
  });

  const inputSample = computed(() => {
    const defaultFromMapping = mappingById(
      config.value?.defaultPair[0] || ''
    );
    const sample = config.value?.sample ?? '';
    const convertedSample = chainConvert(sample, defaultFromMapping, undefined);

    return chainConvert(convertedSample, undefined, inputMapping.value);
  });

  const outputSample = computed(() => {
    const defaultFromMapping = mappingById(
      config.value?.defaultPair[0] || ''
    );
    const sample = config.value?.sample ?? '';
    const convertedSample = chainConvert(sample, defaultFromMapping, undefined);

    return chainConvert(convertedSample, undefined, outputMapping.value);
  });

  function reverse() {
    const tempOutput = output.value;
    const tempInputId = inputMappingId.value;
    inputMappingId.value = outputMappingId.value;
    outputMappingId.value = tempInputId;
    input.value = tempOutput;
  };

  function convert(text: string) {
    return chainConvert(text, inputMapping.value, outputMapping.value);
  }

  return {
    config,
    mappings,

    input,
    inputMappingId,
    outputMappingId,

    mappingById,
    inputMapping,
    outputMapping,
    output,
    inputSample,
    outputSample,

    reverse,
    convert,
  };
}
