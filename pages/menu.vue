<script setup lang="ts">
import useLang from '~/composables/lang';

definePageMeta({
  layout: false,
});

const { allLangs } = useLang();
const backLink = ref();
onBeforeMount(() => {
  backLink.value = localStorage.getItem('lastUrl');
});
</script>

<template>
  <div class="flex flex-col">
    <AppHeader :to="backLink" icon="i-heroicons-arrow-left">
      <ULink href="https://github.com/raxysstudios/yaziv" class="flex items pop">
        <UIcon name="i-heroicons-code-bracket" />
      </ULink>
    </AppHeader>
    <UDivider />
    <LangCard v-for="l in allLangs" :key="l.id" :lang="l" />
  </div>
</template>
