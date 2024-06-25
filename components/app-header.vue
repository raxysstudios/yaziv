<script setup lang="ts">
defineProps<{
    title: string,
    icon?: string,
    link?: string,
}>();
</script>

<template>
    <NuxtLink :to="link" class="work-p">
        <div class="work-c flex items-center gap-4 text-lg capitalize font-medium">
            <UIcon v-if="icon" :name="icon" />
            <span class="capitalize font-medium">{{ title }}</span>
            <div class="flex-1" />
            <div @click="(e: any) => e.stopPropagation()">
                <slot />
            </div>
        </div>
    </NuxtLink>
</template>
