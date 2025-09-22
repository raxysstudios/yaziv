<script setup lang="ts">
import type { Lang } from "~/utils/types";

const props = defineProps<{
    lang: Lang
}>();

const { locale } = useI18n();

const flagUrl = computed(() => {
    return `/data/langs/${props.lang.id}/f.png`;
});
</script>

<template>
    <AppSegment class="transition hover:bg-neutral-100 active:bg-neutral-200 dark:hover:bg-neutral-800 dark:active:bg-neutral-700">
        <div class="flex gap-2 items-center">
            <img :src="flagUrl" :alt="lang.id" @error="$event.target.style.display='none'"
                class="size-8 rounded-md object-cover border border-neutral-200 dark:border-neutral-700">
            <p class="capitalize">{{ tDict(lang.name, locale) }}</p>
            <UBadge size="sm" variant="soft">
                {{ lang.id }}
            </UBadge>
        </div>
    </AppSegment>
</template>
