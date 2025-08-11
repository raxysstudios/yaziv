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
    <UButton v-if="nextLocale" icon="i-material-symbols-translate" @click="setLocale(nextLocale.code)">
        {{ nextLocale.name }}
    </UButton>
</template>
