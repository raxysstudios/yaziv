<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Finlandica:ital,wght@0,400..700;1,400..700&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@100..900&family=Noto+Sans+Georgian:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap');


.native,
.native * {
  font-family: "Noto Sans", "Noto Sans Arabic", "Noto Sans Georgian", sans-serif;
}

* {
  font-family: "Finlandica";
  @apply transition duration-150 ease-out;
}
</style>
