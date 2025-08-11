export default defineNuxtRouteMiddleware((to) => {
    if (import.meta.client && to.path === '/') {
        const lastUrl = localStorage.getItem('lastUrl');
        if (lastUrl && lastUrl !== '/') {
            return navigateTo(lastUrl);
        }
        return navigateTo('/home');
    }
});
