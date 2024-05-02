<script setup lang="ts">
import { onMounted, ref } from 'vue';
import useLang from '~/composables/lang';
import type { Lang } from '~/utils/types';
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
  <div class="flex overflow-auto gap-1">
    <UButton v-for="l in prefLangs" :key="l.id" :variant="l.id === lang ? 'solid' : 'soft'" color="gray"
      class="capitalize" @click="pick(l)">
      <!-- <template #leading>
        <UAvatar
          :src="`https://firebasestorage.googleapis.com/v0/b/avzagapp.appspot.com/o/flags%2F${l.flag ?? l.name}.png?alt=media`"
          size="3xs" imgClass="object-cover" />
      </template> -->
      {{ l.name }}
    </UButton>
  </div>
</template>