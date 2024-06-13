<script setup lang="ts">
import useLang from '~/composables/lang';

defineProps({
    title: String,
});

const { lang } = await useLang();
</script>

<template>
    <NuxtLink to="/" class="w-full flex justify-center hover:bg-slate-50 active:bg-slate-100">
        <div class="py-2 flex items-center gap-2 text-lg w-2/3">
            <UIcon class="text-sm" name="i-heroicons-arrow-left" />
            {{ title }}
            <UButton variant="solid" size="2xs" color="gray" class="capitalize">
                {{ lang }}
            </UButton>
        </div>
    </NuxtLink>
</template>
