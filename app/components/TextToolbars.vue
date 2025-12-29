<template>
  <div class="flex flex-col gap-2 rounded-md">
    <div class="flex flex-1 flex-row gap-2">
      <slot />
      <div class="flex flex-col gap-2">
        <slot name="v-bar" />
      </div>
    </div>
    <div class="flex items-center flex-row gap-2">
      <slot name="h-bar" />
    </div>
  </div>
</template>
