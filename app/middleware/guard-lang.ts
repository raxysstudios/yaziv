import { getLangById } from '~/data/langs';

export default defineNuxtRouteMiddleware((to) => {
    const langId = to.params.lang as string;
    if (!getLangById(langId)) {
        throw createError({
            statusCode: 404,
        });
    }
});
