import useLang from "~/composables/lang";

export default defineNuxtRouteMiddleware((to, _) => {
  if (import.meta.server) return;

  const { lang, allLangs } = useLang();
  lang.value = localStorage.getItem("lang") ?? "";

  if (to.path == "/menu") return;
  const q = to.query.lang;

  if (allLangs.some((l) => l.id == q)) {
    lang.value = q as string;
  } else if (!lang.value) {
    return navigateTo("/menu");
  }
});
