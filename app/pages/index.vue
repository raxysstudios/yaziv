<script lang="ts" setup>
onMounted(async () => {
  const lastUrl = localStorage.getItem('lastUrl');
  navigateTo(lastUrl ?? '/home');
});
</script>

<template>
  <AppHeader link="/home" />
</template>
