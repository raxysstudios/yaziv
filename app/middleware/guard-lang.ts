export default defineNuxtRouteMiddleware((to) => {
    const lang = to.params.lang as string;
    const langName = allLangs.find((l) => l.id === lang)?.name;

    if (!langName) {
        return navigateTo('/home');
    }
});
