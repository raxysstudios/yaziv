<script setup lang="ts">
defineProps<{
    badge?: string,
    icon?: string,
    link?: string,
}>();
</script>

<template>
    <AppSegment class="shadow">
        <div class="flex flex-row items-center gap-2">
            <NuxtLinkLocale v-if="link" :to="link">
                <UButton :icon="icon ?? 'i-material-symbols-arrow-back-rounded'" />
            </NuxtLinkLocale>
            <p class="text-lg capitalize font-medium ">Yaziv</p>
            <UBadge v-if="badge" variant="soft">
                {{ badge }}
            </UBadge>
            <div class="flex-1" />
            <slot />
            <USeparator v-if="$slots.default" orientation="vertical" size="sm" class="h-4" />
            <AppLocaleSwitch />
        </div>
    </AppSegment>
    <USeparator class="w-full" />
</template>
