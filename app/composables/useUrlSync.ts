let queue: Record<string, string | undefined> = {};
let scheduled = false;

export default function useUrlSync<T>(
    ref: Ref<T>,
    key: string,
    validate?: (value: T) => boolean,
) {
    const router = useRouter();

    watch(() => router.currentRoute.value.query[key], (value) => {
        if (value == undefined) return;

        const parsed = (typeof ref.value === 'number'
            ? Number(value)
            : value
        ) as T;

        if (!validate || validate(parsed)) {
            ref.value = parsed;
        }
    }, {
        immediate: true
    });

    watch(ref, (value) => {
        const param = value == undefined ? undefined : String(value);
        const route = router.currentRoute;

        if (route.value.query[key] == param) return;
        queue[key] = param;

        if (scheduled) return;
        scheduled = true;
        nextTick(() => {
            const query = { ...route.value.query };
            for (const [k, v] of Object.entries(queue)) {
                if (v == undefined) delete query[k];
                else query[k] = v;
            }
            router.replace({ query });

            queue = {};
            scheduled = false;
        });
    });

    return ref;
}
