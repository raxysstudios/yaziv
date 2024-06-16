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
    <NuxtLink to="/" class="w-full flex justify-center hover:bg-slate-50 active:bg-slate-100">
        <div class="work-area flex items-center gap-2 text-lg capitalize font-medium">
            <!-- <UIcon class="text-sm" name="i-heroicons-arrow-left" />
            {{ title }}
            <UButton variant="solid" size="2xs" color="gray" class="capitalize">
                {{ lang }}
            </UButton> -->
            <UIcon class="text" name="i-heroicons-home-solid" />
            <span class="capitalize font-medium">{{ title }}</span>
        </div>
    </NuxtLink>
</template>
