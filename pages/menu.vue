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
    <AppHeader :to="backLink" icon="i-heroicons-arrow-left">
      <ULink to="/editor" class="flex pop">
        <UIcon name="i-heroicons-pencil-square" />
      </ULink>
      <ULink href="https://github.com/raxysstudios/yaziv" class="flex pop">
        <UIcon name="i-heroicons-code-bracket" />
      </ULink>
    </AppHeader>
    <UDivider />
    <LangCard v-for="l in allLangs" :key="l.id" :lang="l" />
  </div>
</template>
