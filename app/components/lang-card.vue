<script setup lang="ts">
import type { Lang } from "~/utils/types";

const props = defineProps<{
    lang: Lang
}>();

const flagUrl = computed(() => {
    const base = 'https://firebasestorage.googleapis.com/v0/b/avzagapp.appspot.com/o/flags%2F';
    const flag = props.lang.flag ?? props.lang.name.toLowerCase();
    return `${base}${flag}.png?alt=media`;
});
</script>

<template>
    <NuxtLink :to="`/?lang=${lang.id}`" class="group">
        <div class="flex py-1 gap-2 overflow-clip items-center">
            <img :src="flagUrl" :alt="lang.id"
                class="transition size-8 rounded-[var(--ui-radius)] object-cover border border-neutral-200 overflow-clip group-hover:scale-105 group-active:scale-100">
            <p class="capitalize">{{ lang.name }}</p>
            <UBadge size="sm" variant="soft">
                {{ lang.id }}
            </UBadge>
            <UIcon class="transition opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100"
                name="i-material-symbols-arrow-right-alt" />
        </div>
    </NuxtLink>
</template>
