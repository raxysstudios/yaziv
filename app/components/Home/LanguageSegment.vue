<script setup lang="ts">
import type { Lang } from "~/utils/types";

const props = defineProps<{
  lang: Lang
}>();

const { locale } = useI18n();

const flagUrl = computed(() => {
  return `/flags/${props.lang.id}.png`;
});
</script>

<template>
  <AppSegment class="transition hover:bg-elevated/75 active:bg-accented/75">
    <div class="flex gap-2 items-center">
      <img :src="flagUrl" :alt="lang.id" class="size-8 rounded-md object-cover border border-default">
      <p class="capitalize">{{ tDict(lang.name, locale) }}</p>
      <UBadge size="sm" variant="soft">
        {{ lang.id }}
      </UBadge>
    </div>
  </AppSegment>
</template>
