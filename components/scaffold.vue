<script setup lang="ts">
defineProps<{
    badge?: string,
    icon?: string,
    link?: string,
}>();
</script>

<template>
    <div id="work" class="w-full flex flex-col items-center p-2">
        <div class="w-full sm:w-5/6 lg:w-2/3 flex flex-col gap-2">
            <div class="flex flex-row items-center gap-2">
                <NuxtLink :to="link">
                    <UButton :icon="icon ?? 'i-heroicons-arrow-left'" class="text-lg capitalize font-medium gap-2">
                        Yaziv
                        <UBadge v-if="badge" class="capitalize" color="gray" variant="solid">
                            {{ badge }}
                        </UBadge>
                    </UButton>
                </NuxtLink>
                <div class="flex-1" />
                <slot name="actions" />
            </div>
            <slot />
        </div>
    </div>
</template>
