<script setup lang="ts">
import useLang from '~/composables/lang';

const { allLangs } = useLang();
const backLink = ref();
onBeforeMount(() => {
  backLink.value = localStorage.getItem('lastUrl');
});

const { locales, setLocale, t } = useI18n();

useSeoMeta({
  title: t('home.seo.title'),
  description: t('home.seo.description'),
});
</script>

<template>
  <AppHeader :link="backLink">
    <NuxtLinkLocale to="/editor">
      <UTooltip :delay-duration="0" :text="$t('home.editor')">
        <UButton icon="i-material-symbols-edit-square-outline" />
      </UTooltip>
    </NuxtLinkLocale>
    <NuxtLinkLocale to="https://github.com/raxysstudios/yaziv" target="_blank">
      <UTooltip :delay-duration="0" :text="$t('home.github')">
        <UButton icon="i-material-symbols-code" />
      </UTooltip>
    </NuxtLinkLocale>
    <USeparator orientation="vertical" class="h-4" />
    <UPopover mode="hover">
      <div class="flex items-center p-1.5">
        <UIcon name="i-material-symbols-translate" class="size-5" />
      </div>
      <template #content>
        <div class="flex flex-col p-1.5">
          <UButton v-for="l in locales" @click="setLocale(l.code)">
            {{ l.name }}
          </UButton>
        </div>
      </template>
    </UPopover>
  </AppHeader>
  <NuxtLinkLocale v-for="l in allLangs" :key="l.id" :to="`/${l.id}`">
    <LanguageSegment :lang="l" />
  </NuxtLinkLocale>
</template>
