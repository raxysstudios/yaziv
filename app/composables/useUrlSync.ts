export default function useUrlSync<T>(
    ref: Ref<T>,
    key: string,
    validate?: (value: T) => boolean,
) {
    const router = useRouter();

    watch(() => router.currentRoute.value.query[key], (value) => {
        if (!value) return;

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
        const query = { ...router.currentRoute.value.query };
        if (query[key] === String(value)) return;

        if (value) {
            query[key] = String(value);
        }
        else {
            delete query[key];
        }

        router.replace({ query });
    });

    return ref;
}
