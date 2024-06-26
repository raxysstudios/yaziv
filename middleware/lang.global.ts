import useLang from "~/composables/lang";

export default defineNuxtRouteMiddleware((to) => {
    if (import.meta.server || to.path == '/menu') {
        return;
    }

    const { allLangs } = useLang();
    const lang = to.query['lang'];
    const isValid = lang && allLangs.some((l) => l.id == lang);

    console.log('NEXT', lang);
    if (isValid) {
        localStorage.setItem('lastUrl', to.fullPath);
    } else {
        let next = '/menu';
        const last = localStorage.getItem('lastUrl');
        if (last && to.fullPath != last ) {
            next = last;
        }
        return navigateTo(next);
    }
})
