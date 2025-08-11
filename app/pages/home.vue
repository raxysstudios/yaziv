<script setup lang="ts">
import useLang from '~/composables/lang';

const { allLangs } = useLang();
</script>

<template>
  <AppHeader link="/">
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
  <NuxtLink v-for="l in allLangs" :key="l.id" :to="`/${l.id}`">
    <LanguageSegment :lang="l" />
  </NuxtLink>
</template>
