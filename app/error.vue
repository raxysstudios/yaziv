<script setup lang="ts">
const localePath = useLocalePath();

await clearError({ redirect: localePath('/home') });
</script>

<template>
</template>
