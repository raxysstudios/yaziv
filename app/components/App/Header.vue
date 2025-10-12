<script setup lang="ts">
const props = defineProps({
    badge: String,
    link: String,
    icon: {
        type: String,
        default: "i-material-symbols-arrow-back-rounded",
    },
    iconLabel: String,
});

const { t } = useI18n();

const label = computed(() => props.iconLabel ?? t('home.menu'))
</script>

<template>
    <AppSegment class="shadow-sm">
        <div class="flex flex-row items-center gap-2">
            <NuxtLinkLocale v-if="link" :to="link">
                <UTooltip :text="label">
                    <UButton :icon="icon" :aria-label="label" />
                </UTooltip>
            </NuxtLinkLocale>
            <p class="text-lg capitalize font-medium ">Yaziv</p>
            <UBadge v-if="badge" variant="soft">
                {{ badge }}
            </UBadge>
            <div class="flex-1" />
            <slot />
            <USeparator v-if="$slots.default" orientation="vertical" class="h-4" />
            <AppLocaleSwitch />
        </div>
    </AppSegment>
    <USeparator class="w-full" />
</template>
