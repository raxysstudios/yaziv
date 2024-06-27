<script setup lang="ts">
defineProps<{
    badge?: string,
    icon?: string,
    link?: string,
}>();
</script>

<template>
    <NuxtLink :to="link" class="work-p">
        <div class="work-c flex items-center gap-4 text-lg capitalize font-medium">
            <UIcon v-if="icon" :name="icon" />
            Yaziv
            <UBadge v-if="badge" class="capitalize" color="gray" variant="solid">
                {{ badge }}
            </UBadge>
            <div class="flex-1" />
            <div class="flex gap-4" @click="(e: any) => e.stopPropagation()">
                <slot />
            </div>
        </div>
    </NuxtLink>
</template>
