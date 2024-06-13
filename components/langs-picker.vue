<script setup lang="ts">
import useLang from '~/composables/lang';
const { lang, allLangs } = await useLang();

const props = defineProps({
  autoPick: Boolean,
});
const emit = defineEmits(['pick']);

const prefLangs = ref([] as Lang[]);
onMounted(() => {
  prefLangs.value = allLangs.reduce((acc, cur) => {
    if (cur.id == lang.value) return [cur, ...acc];
    return [...acc, cur];
  }, [] as Lang[]);
});

function pick(l: Lang) {
  if (props.autoPick) {
    lang.value = lang.value == l.id ? '' : l.id;
  }
  emit('pick', l);
}
</script>

<template>
  <div class="flex overflow-auto gap-1 hover:" >
    <UButton v-for="l in prefLangs" :key="l.id" :variant="l.id === lang ? 'solid' : 'soft'" color="gray"
      class="capitalize" @click="pick(l)">
      {{ l.name }}
    </UButton>
  </div>
</template>
