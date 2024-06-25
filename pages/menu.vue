<script setup lang="ts">
import useLang from '~/composables/lang';

definePageMeta({
  layout: false,
});

const { allLangs } = useLang();
const prevLang = ref();
onBeforeMount(() => {
  prevLang.value = localStorage.getItem('lang');
})
</script>

<template>
  <div class="flex flex-col">
    <AppHeader :to="`/?lang=${prevLang}`" icon="i-heroicons-arrow-left">
      <ULink href="https://github.com/raxysstudios/yaziv" class="flex items pop">
        <UIcon name="i-heroicons-code-bracket" />
      </ULink>
    </AppHeader>
    <UDivider />
    <LangCard v-for="l in allLangs" :key="l.id" :lang="l" />
  </div>
</template>
