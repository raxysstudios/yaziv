<script setup lang="ts">
import type { Lang } from "~/utils/types";

defineProps<{
    lang: Lang
}>();

// const flagUrl = computed(() => {
//     const base = 'https://firebasestorage.googleapis.com/v0/b/avzagapp.appspot.com/o/flags%2F';
//     const flag = props.lang.flag ?? props.lang.name.toLowerCase();
//     return `${base}${flag}.png?alt=media`;
// });
</script>

<template>
    <NuxtLink :to="`/?lang=${lang.id}`" class="work-p group">
        <div class="work-c flex gap-4 items-center">
            <!-- <UAvatar class="ring-1 ring-slate-200" size="xs" img-class="object-cover"
                :alt="lang.id" /> -->
            <UButton style='solid' size="2xs" color="gray">
                {{ lang.id }}
            </UButton>
            <p class="capitalize">{{ lang.name }}</p>
            <UIcon class="text-sm opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100"
                name="i-heroicons-arrow-right" />
        </div>
    </NuxtLink>
</template>
