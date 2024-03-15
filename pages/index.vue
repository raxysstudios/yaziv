<template>
  <div class="flex flex-col">
    <h2 class="px-8 pt-6 text-2xl font-medium">
      Yaziv
    </h2>
    <LangsPicker class="px-8 py-4" auto-pick />
    <UDivider />
    <AppCard link="/converter" title="Converter" />
    <AppCard link="/levenshtein" title="Levenshtein" />
    <AppCard link="/counter" title="Counter" />
  </div>
</template>