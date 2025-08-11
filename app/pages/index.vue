<script setup lang="ts">
definePageMeta({
  middleware: 'redirect-root'
});

useSeoMeta({
  title: $t('home.seo.title'),
  description: $t('home.seo.description'),
});
</script>

<template>
  <AppHeader link="/home" />
</template>
