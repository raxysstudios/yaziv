<template>
  <div>
    <NuxtPwaManifest />
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@100..900&family=Noto+Sans+Georgian:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap');


.native,
.native * {
  font-family: "Noto Sans", "Noto Sans Arabic", "Noto Sans Georgian", sans-serif;
}

* {
  font-family: "Ubuntu";
  @apply transition duration-150 ease-out;
}
</style>
