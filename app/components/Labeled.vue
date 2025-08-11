<script lang="ts" setup>
defineProps<{
    label: string,
}>();
</script>

<template>
    <div class="flex flex-col gap-1">
        <label class="text-sm">{{ label }}</label>
        <slot />
    </div>
</template>
