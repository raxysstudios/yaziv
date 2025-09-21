<script setup lang="ts">
const { locales, locale, setLocale } = useI18n();

const nextLocale = computed(() => {
    let index = locales.value.findIndex(l => l.code === locale.value);
    if (++index >= locales.value.length) {
        index = 0;
    }
    return locales.value[index];
});
</script>

<template>
    <UTooltip v-if="nextLocale" :delay-duration="0" :text="nextLocale.name">
        <UButton v-if="nextLocale" icon="i-material-symbols-translate-rounded" @click="setLocale(nextLocale.code)" />
    </UTooltip>
</template>
