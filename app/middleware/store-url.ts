export default defineNuxtRouteMiddleware((to) => {
  const lastUrl = useCookie('lastUrl', {
    maxAge: 60 * 60 * 24 * 30 // 30 days
  });

  lastUrl.value = to.fullPath;
});