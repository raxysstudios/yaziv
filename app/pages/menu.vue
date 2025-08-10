<script setup lang="ts">
import useLang from '~/composables/lang';

const { allLangs } = useLang();
const backLink = ref();
onBeforeMount(() => {
  backLink.value = localStorage.getItem('lastUrl');
});

useSeoMeta({
  title: `Yaziv`,
  description: `Script converter for the languages of the Caucasus.`,
})
</script>

<template>
  <AppHeader :link="backLink">
    <ULink to="/editor">
      <UTooltip :delay-duration="0" text="Open editor">
        <UButton icon="i-material-symbols-edit-square-outline" />
      </UTooltip>
    </ULink>
    <ULink to="https://github.com/raxysstudios/yaziv" target="_blank">
      <UTooltip :delay-duration="0" text="View on GitHub">
        <UButton icon="i-material-symbols-code" />
      </UTooltip>
    </ULink>
  </AppHeader>
  <LanguageSegment v-for="l in allLangs" :key="l.id" :lang="l" />
</template>
