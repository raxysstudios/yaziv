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
        <div class="flex p-2 gap-2 overflow-clip items-center">
            <img :src="flagUrl" :alt="lang.id"
                class="mr-2 object-cover size-7 rounded-full group-hover:scale-110  group-active:scale-110 border ring-slate-300 group-hover:ring-offset-2 group-hover:ring">
            <p class="capitalize">{{ lang.name }}</p>
            <UBadge size="xs" color="gray" variant="solid">
                {{ lang.id }}
            </UBadge>
            <UIcon class="ml-2 text-sm opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100"
                name="i-heroicons-arrow-right" />
        </div>
    </NuxtLink>
</template>
