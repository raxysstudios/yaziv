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

  const state = reactive({
    input: '',
    inputMappingId: '',
    outputMappingId: ''
  });

  watch(converterData, (data) => {
    if (!data) return;
    state.inputMappingId = data.config.defaultPair[0];
    state.outputMappingId = data.config.defaultPair[1];
  }, {
    immediate: true
  });

  const inputMapping = computed(() =>
    mappingById(state.inputMappingId)
  );

  const outputMapping = computed(() =>
    mappingById(state.outputMappingId)
  );

  const output = computed(() =>
    convert(state.input)
  );

  const inputSample = computed(() => {
    const defaultFromMapping = mappingById(
      converterData.value?.config.defaultPair[0] || ''
    );
    const sample = converterData.value?.config.sample ?? '';
    const convertedSample = chainConvert(sample, defaultFromMapping, undefined);

    return chainConvert(convertedSample, undefined, inputMapping.value);
  });

  const outputSample = computed(() => {
    const defaultFromMapping = mappingById(
      converterData.value?.config.defaultPair[0] || ''
    );
    const sample = converterData.value?.config.sample ?? '';
    const convertedSample = chainConvert(sample, defaultFromMapping, undefined);

    return chainConvert(convertedSample, undefined, outputMapping.value);
  });

  function mappingById(id: string) {
    return converterData.value?.mappings.find(m => m.id === id);
  }

  function reverse() {
    const tempOutput = output.value;
    const tempInputId = state.inputMappingId;
    state.inputMappingId = state.outputMappingId;
    state.outputMappingId = tempInputId;
    state.input = tempOutput;
  };

  function convert(text: string) {
    return chainConvert(text, inputMapping.value, outputMapping.value);
  }

  return {
    config: computed(() => converterData.value?.config),
    mappings: computed(() => converterData.value?.mappings),
    state,

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
