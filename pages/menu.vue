<script setup lang="ts">
import useLang from '~/composables/lang';

const { allLangs } = useLang();
const backLink = ref();
onBeforeMount(() => {
  backLink.value = localStorage.getItem('lastUrl');
});
</script>

<template>
  <div class="flex flex-col">
    <AppHeader :link="backLink">
      <ULink to="/editor" class="flex">
        <UButton icon="i-heroicons-pencil-square" />
      </ULink>
      <ULink to="https://github.com/raxysstudios/yaziv" class="flex">
        <UButton icon="i-heroicons-code-bracket" />
      </ULink>
    </AppHeader>
    <LangCard v-for="l in allLangs" :key="l.id" :lang="l" />
  </div>
</template>
