<script setup lang="ts">
definePageMeta({
  middleware: 'redirect-root'
});

const { t } = useI18n();
useSeoMeta({
  title: t('home.seo.title'),
  description: t('home.seo.description'),
});
</script>

<template>
  <AppHeader link="/home" />
</template>
