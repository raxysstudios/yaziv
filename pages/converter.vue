<script setup lang="ts">
import useLang from '~/composables/lang';

import { chainConvert } from '~/utils/converter';

const { lang } = await useLang();
const converter = ref<ConverterConfig>();
const from = ref<Mapping>();
const to = ref<Mapping>()

watch(lang, async (val) => {
  if (!val) return;
  converter.value = await $fetch<ConverterConfig>(
    `/langs/${val}/converter.json`
  ).catch(() => undefined);
  if (converter.value) {
    from.value = converter.value.mappings[0];
    to.value = converter.value.mappings[1];
  }
}, {
  immediate: true
})


const placeholders = computed(() => {
  const sample = chainConvert(
    converter.value?.sample ?? '',
    converter.value?.mappings[0], undefined
    );
    return {
      from: chainConvert(sample, undefined, from.value),
      to: chainConvert(sample, undefined, to.value)
    };
  });
  const input = ref('');
  const output = computed(() => chainConvert(
    input.value, from.value, to.value
    ));
    // const showMapping = ref(false);
    
    // function copy() {
      //     navigator.clipboard.writeText(output.value);
// }

// function reverse() {
//     [from, to] = [to, from];
//     input.value = output.value;
// }
</script>

<template>
  <div class="container max-w-72">
    <template v-if="converter">
      <USelectMenu
        v-model="from"
        :options="converter?.mappings"
        option-attribute="name"
      />
      <USelectMenu
        v-model="to"
        :options="converter?.mappings"
        option-attribute="name"
      />
      <UTextarea
        v-model="input"
        size="xl"
        :placeholder="placeholders.from"
      />
      <UTextarea
        v-model="output"
        disabled
        variant="none"
        color="gray"
        size="xl"
        :placeholder="placeholders.to"
        :ui="{ base: 'disabled:!cursor-text' }"
      />
    </template>
  </div>
</template>import { chainConvert } from '~/utils/converter';
import { chainConvert } from '~/utils/converter';
