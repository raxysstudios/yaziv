<script setup lang="ts">
defineProps<{
    badge?: string,
    icon?: string,
    link?: string,
}>();
</script>

<template>
    <div class="work-p">
        <div class="work-c flex items-center gap-2">
            <NuxtLink :to="link">
                <UButton :icon="icon ?? 'i-heroicons-arrow-left'" class="text-lg capitalize font-medium gap-2">
                    Yaziv
                </UButton>
            </NuxtLink>
            <UBadge v-if="badge" class="capitalize" color="gray" variant="solid">
                {{ badge }}
            </UBadge>
            <div class="flex-1" />
            <slot />
        </div>
    </div>
</template>
