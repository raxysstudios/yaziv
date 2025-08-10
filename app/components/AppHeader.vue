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
            <NuxtLink :to="link">
                <UButton :icon="icon ?? 'i-material-symbols-arrow-back'" />
            </NuxtLink>
            <p class="text-lg capitalize font-medium ">Yaziv</p>
            <UBadge v-if="badge" class="capitalize" variant="soft">
                {{ badge }}
            </UBadge>
            <div class="flex-1" />
            <slot/>
        </div>
    </AppSegment>
    <USeparator class="w-full" />
</template>
