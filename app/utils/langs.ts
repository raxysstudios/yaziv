import langs from '~/data/langs.json';

langs.sort((a, b) => a.id.localeCompare(b.id));

export { langs }

export function getLangById(id: string) {
  return langs.find((l) => l.id === id);
}
