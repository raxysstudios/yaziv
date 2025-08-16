import type { Lang } from "~/utils/types";

export const langs = [
    {
        id: "abq",
        name: { en: "Abaza", ru: "Абазинский" },
    },
    {
        id: "abk",
        name: { en: "Abkhaz", ru: "Абхазский" },
    },
    {
        id: "agx",
        name: { en: "Aghul", ru: "Агульский", },
    },
    {
        id: "xdq",
        name: { en: "Kaitag", ru: "Кайтагский" },
    },
    {
        id: "kum",
        name: { en: "Kumyk", ru: "Кумыкский" },
    },
    {
        id: "tkr",
        name: { en: "Tsakhur", ru: "Цахурский" },
    },
    {
        id: "oss",
        name: { en: "Ossetian", ru: "Осетинский" },
        flag: "iron",
    },
    {
        id: "lez",
        name: { en: "Lezgi", ru: "Лезгинский" },
    },
    {
        id: "kat",
        name: { en: "Georgian", ru: "Грузинский" },
    },
] as Lang[];

langs.sort((a, b) => a.id.localeCompare(b.id));

export function getLangById(id: string) {
    return langs.find((l) => l.id === id);
}
