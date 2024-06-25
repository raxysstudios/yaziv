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
    <div class="w-full flex flex-col items-center">
        <AppHeader link="/menu" icon="i-heroicons-bars-3" :title="title ?? 'NOT FOUND'" />
        <UDivider />
        <slot v-if="title" />
    </div>
</template>
