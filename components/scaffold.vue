<script setup lang="ts">
defineProps<{
    badge?: string,
    icon?: string,
    link?: string,
}>();
</script>

<template>
    <div class="w-full flex flex-col items-center">
        <div class="work-body flex flex-row items-center gap-2">
            <NuxtLink :to="link">
                <UButton :icon="icon ?? 'i-heroicons-arrow-left'" class="text-lg capitalize font-medium gap-2">
                    Yaziv
                </UButton>
            </NuxtLink>
            <UBadge v-if="badge" class="capitalize" color="gray" variant="solid">
                {{ badge }}
            </UBadge>
            <div class="flex-1" />
            <slot name="actions" />
        </div>
        <div class="work-body">
            <slot />
        </div>
    </div>
</template>

<style>
.work-body {
    @apply py-2 px-4 w-full sm:w-5/6 lg:w-2/3
}
</style>
