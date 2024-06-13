<script setup lang="ts">
defineProps({
    link: String,
    title: String,
    disabled: Boolean,
});
</script>

<template>
    <NuxtLink :to="disabled ? undefined : link" class="group bg-gradient-to-r" :class="{ disabled }">
        <div class="px-8 py-4 flex items-center text-lg">
            {{ title }}
            <UIcon class="text-sm opacity-0 group-hover:translate-x-2 group-hover:opacity-100"
                name="i-heroicons-arrow-right" />
        </div>
    </NuxtLink>
</template>

<style scoped>
.disabled {
    @apply opacity-50;
}

:not(.disabled) {
    @apply hover:from-slate-50 active:from-slate-100;
}
</style>
