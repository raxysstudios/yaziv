import useLang from "~/composables/lang";

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server || to.path == "/menu") {
    return;
  }

  const { allLangs } = useLang();
  const lang = to.query.lang;
  if (!allLangs.some((l) => l.id == lang)) {
    return navigateTo("/menu");
  }
});
