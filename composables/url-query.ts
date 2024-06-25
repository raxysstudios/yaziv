export default function queryState<T>(
    ref: Ref<T>,
    key: string,
    fallback: T
) {
    const router = useRouter();
    watch(router.currentRoute, (route) => {
        const value = route.query[key] as T ?? fallback;
        if (value == ref.value) return;
        ref.value = typeof fallback === 'number'
            ? Number(value) as any
            : value;
    }, {
        immediate: true,
    });
    watch(ref, (ref) => {
        const route = router.currentRoute.value;
        if (route.query[key] == ref) return;
        router.replace({
            path: route.path,
            query: { ...route.query, [key]: ref as any }
        });
    }, {
        immediate: true,
    });
    return ref;
}
