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

        <div class="flex gap-3 p-4 items-center">
            <UAvatar :src="flagUrl"
                class="ring-1 ring-gray-300 group-hover:scale-110 group-hover:ring-offset-2 group-hover:ring group-active:scale-105"
                img-class="object-cover" :alt="lang.id" />
            <p class="capitalize">{{ lang.name }}</p>
            <UIcon class="text-sm opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100"
                name="i-heroicons-arrow-right" />
        </div>
    </NuxtLink>
</template>
