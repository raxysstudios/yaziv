<script setup lang="ts">
import type { Lang } from "~/utils/types";

const props = defineProps<{
    lang: Lang
}>();

const { locale } = useI18n();

const flagUrl = computed(() => {
    const base = 'https://firebasestorage.googleapis.com/v0/b/avzagapp.appspot.com/o/flags%2F';
    const flag = props.lang.flag ?? props.lang.name.en!.toLowerCase();
    return `${base}${flag}.png?alt=media`;
});
</script>

<template>
    <AppSegment class="transition hover:bg-neutral-100 active:bg-neutral-200">
        <div class="flex gap-2 items-center">
            <img :src="flagUrl" :alt="lang.id"
                class="transition size-8 rounded-md object-cover border border-neutral-200">
            <p class="capitalize">{{ tDict(lang.name, locale) }}</p>
            <UBadge size="sm" variant="soft">
                {{ lang.id }}
            </UBadge>
        </div>
    </AppSegment>
</template>
