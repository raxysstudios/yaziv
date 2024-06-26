<script setup lang="ts">
defineProps<{
    title?: string,
    icon?: string,
    link?: string,
}>();
</script>

<template>
    <NuxtLink :to="link" class="work-p">
        <div class="work-c flex items-center gap-4 text-lg capitalize font-medium">
            <UIcon v-if="icon" :name="icon" />
            Yaziv
            <UButton v-if="title" class="capitalize" color="gray" variant="solid" size="2xs">
                {{ title }}
            </UButton>
            <div class="flex-1" />
            <div class="flex gap-4" @click="(e: any) => e.stopPropagation()">
                <slot />
            </div>
        </div>
    </NuxtLink>
</template>
