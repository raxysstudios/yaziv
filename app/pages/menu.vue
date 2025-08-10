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
        <UButton icon="i-material-symbols-edit-square-outline"></UButton>
      </ULink>
      <ULink to="https://github.com/raxysstudios/yaziv" class="flex">
        <UButton icon="i-material-symbols-code"></UButton>
      </ULink>
    </template>
    <div class="grid grid-cols-1">
      <LangCard v-for="l in allLangs" :key="l.id" :lang="l" />
    </div>
  </Scaffold>
</template>
