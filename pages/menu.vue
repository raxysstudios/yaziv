<script setup lang="ts">
import useLang from '~/composables/lang';

const { allLangs } = useLang();
const backLink = ref();
onBeforeMount(() => {
  backLink.value = localStorage.getItem('lastUrl');
});
</script>

<template>
  <Scaffold :link="backLink">
    <template #actions>
      <ULink to="/editor" class="flex">
        <UButton icon="i-heroicons-pencil-square" />
      </ULink>
      <ULink to="https://github.com/raxysstudios/yaziv" class="flex">
        <UButton icon="i-heroicons-code-bracket" />
      </ULink>
    </template>
    <div class="grid grid-cols-4 gap-2">
      <LangCard v-for="l in allLangs" :key="l.id" :lang="l" />
    </div>
  </Scaffold>
</template>
