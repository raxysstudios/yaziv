export function tDict(
  value: string | Record<string, string> | undefined,
  locale: Ref<string> | string,
) {
  locale = typeof locale === 'string' ? locale : locale.value;

  if (!value) {
    return '[missing]';
  }
  if (typeof value === 'string') {
    return value;
  }
  return value[locale]! ?? value['en'];
}
