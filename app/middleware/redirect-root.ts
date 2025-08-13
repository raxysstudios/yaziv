export default defineNuxtRouteMiddleware(() => {
    const lastUrl = useCookie('lastUrl').value;
    if (lastUrl && lastUrl != '/') {
        return navigateTo(lastUrl);
    }
});
