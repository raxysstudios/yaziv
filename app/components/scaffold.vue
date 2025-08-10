<script setup lang="ts">
import { USeparator } from '#components';

defineProps<{
    badge?: string,
    icon?: string,
    link?: string,
}>();
</script>

<template>
    <div id="work" class="w-full flex flex-col items-center p-2 gap-2">
        <div class="w-full sm:w-5/6 lg:w-2/3 flex flex-col gap-2">
            <div class="flex flex-row items-center gap-2">
                <NuxtLink :to="link">
                    <UButton :icon="icon ?? 'i-material-symbols-arrow-back'" />
                </NuxtLink>
                <p class="text-lg capitalize font-medium ">Yaziv</p>
                <UBadge v-if="badge" class="capitalize" variant="soft">
                    {{ badge }}
                </UBadge>
                <div class="flex-1" />
                <slot name="actions" />
            </div>

        </div>
        <USeparator class="w-[calc(100%+var(--spacing)*4)]" />
        <div class="w-full sm:w-5/6 lg:w-2/3 flex flex-col gap-2">
            <slot />
        </div>
    </div>
</template>
