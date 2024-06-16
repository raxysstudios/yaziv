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
            <!-- <UIcon class="text-sm" name="i-heroicons-arrow-left" />
            {{ title }}
            <UButton variant="solid" size="2xs" color="gray" class="capitalize">
                {{ lang }}
            </UButton> -->
            <UIcon v-if="icon" :name="icon" />
            <span class="capitalize font-medium">{{ title }}</span>
            <div class="flex-1" />
            <div @click="(e) => e.stopPropagation()">
                <slot />
            </div>
        </div>
    </NuxtLink>
</template>
