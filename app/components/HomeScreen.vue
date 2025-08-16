<script setup lang="ts">
import { langs } from '~/data/langs';

const lastUrl = useCookie('lastUrl');

const { t } = useI18n();
useSeoMeta({
    title: t('home.seo.title'),
    description: t('home.seo.description'),
});
</script>

<template>
    <AppHeader :link="lastUrl ?? undefined">
        <NuxtLinkLocale to="/editor">
            <UTooltip :delay-duration="0" :text="$t('home.editor')">
                <UButton icon="i-material-symbols-edit-square-outline" />
            </UTooltip>
        </NuxtLinkLocale>
    </AppHeader>
    <NuxtLinkLocale v-for="l in langs" :key="l.id" :to="`/${l.id}`">
        <LanguageSegment :lang="l" />
    </NuxtLinkLocale>
    <AppSegment>
        <USeparator />
        <div class="flex justify-between font-bold!">
            <UButton to="https://raxys.app" target="_blank" icon="i-material-symbols-landscape" size="xs">
                {{ $t('home.raxys') }}
            </UButton>
            <UButton to="https://github.com/raxysstudios/yaziv" target="_blank" size="xs">
                v1.2.1
            </UButton>
        </div>
    </AppSegment>
</template>
