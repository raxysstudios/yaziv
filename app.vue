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
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

* {
  font-family: "Fira Sans";
  @apply transition duration-150 ease-out;
}

.work-p {
  @apply w-full flex justify-center hover:bg-slate-50 active:bg-slate-100;
}

.work-c {
  @apply py-2 px-4 w-full sm:w-5/6 lg:w-2/3;
}

.pop {
  @apply p-1 hover:scale-110 active:scale-100;
}
</style>
