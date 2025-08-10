export function capitalize(value: any) {
    const str = String(value);
    return str.charAt(0).toUpperCase() + str.slice(1);
}
