<script setup lang="ts">
import { langs } from '~/utils/langs';

const lastUrl = useCookie('lastUrl');

const { t } = useI18n();
useSeoMeta({
    title: t('home.seo.title'),
    description: t('home.seo.description'),
});
</script>

<template>
    <AppHeader :link="lastUrl ?? undefined" :iconLabel="$t('home.back')">
        <NuxtLinkLocale to="/editor">
            <UTooltip :delay-duration="0" :text="$t('home.editor')">
                <UButton icon="i-material-symbols-edit-note-outline-rounded" />
            </UTooltip>
        </NuxtLinkLocale>
    </AppHeader>
    <NuxtLinkLocale v-for="l in langs" :key="l.id" :to="`/${l.id}`">
        <HomeLanguageSegment :lang="l" />
    </NuxtLinkLocale>
    <AppFooter />
</template>
