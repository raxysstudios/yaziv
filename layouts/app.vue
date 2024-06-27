<script setup lang="ts">
import useLang from '~/composables/lang';

const { lang, allLangs } = useLang();
const title = computed(() => {
    return allLangs
        .find(l => l.id == lang.value)
        ?.name;
});
</script>

<template>
    <AppHeader link="/menu" icon="i-heroicons-bars-3" :badge="title">
        <slot v-if="title" />
    </AppHeader>
</template>
