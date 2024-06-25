<script setup lang="ts">
import useLang from '~/composables/lang';

const { allLangs } = useLang();
</script>

<template>
  <div class="flex flex-col">
    <AppHeader title="Yaziv" link="/" icon="i-heroicons-arrow-left">
      <ULink to="https://github.com/raxysstudios/yaziv" class="flex items pop">
        <UIcon name="i-heroicons-code-bracket" />
      </ULink>
    </AppHeader>
    <UDivider />
    <LangCard v-for="l in allLangs" :key="l.id" :lang="l" />
  </div>
</template>
