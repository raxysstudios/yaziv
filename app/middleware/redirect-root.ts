export default defineNuxtRouteMiddleware((to) => {
    if (!import.meta.client) return;

    const lastUrl = localStorage.getItem('lastUrl');
    if (lastUrl && lastUrl !== '/') {
        // // Temporary fix to migrate from old saves
        // if (lastUrl.endsWith('/')) {
        //     lastUrl = lastUrl.slice(0, -1);
        // }
        return navigateTo(lastUrl);
    }
    return navigateTo('/home');
});
