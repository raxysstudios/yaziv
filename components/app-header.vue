<script setup lang="ts">
import useLang from '~/composables/lang';

defineProps({
    title: String,
});

const { lang, allLangs } = await useLang();
const title = computed(() => {
    return allLangs
        .find(l => l.id == lang.value)
        ?.name;
});
</script>

<template>
    <NuxtLink to="/menu" class="w-full flex justify-center hover:bg-slate-50 active:bg-slate-100">
        <h1 class="work-area flex items-center gap-4 text-lg capitalize font-medium">
            <!-- <UIcon class="text-sm" name="i-heroicons-arrow-left" />
            {{ title }}
            <UButton variant="solid" size="2xs" color="gray" class="capitalize">
                {{ lang }}
            </UButton> -->
            <UIcon class="text-2xl" name="i-heroicons-globe-europe-africa-solid" />
            <span class="capitalize font-medium">{{ title }}</span>
        </h1>
    </NuxtLink>
</template>
