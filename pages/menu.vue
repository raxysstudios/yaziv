<script setup lang="ts">
import useLang from '~/composables/lang';

const { allLangs } = await useLang();
</script>

<template>
  <div class="flex flex-col">
    <div class="flex justify-between items-center">
      <p class="text-lg font-medium p-4">
        Yaziv
      </p>
      <ULink to="https://github.com/raxysstudios/yaziv" class="p-4 flex items">
        <UIcon name="i-heroicons-code-bracket" />
      </ULink>
    </div>
    <UDivider />
    <LangCard v-for="l in allLangs" :key="l.id" :lang="l" />
  </div>
</template>
