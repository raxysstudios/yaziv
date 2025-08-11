import type { Lang } from "~/utils/types";

const allLangs = [
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
    name: { en: "Ossetian", ru: "Осетинскй" },
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
allLangs.sort((a, b) => a.name.en!.localeCompare(b.name.en!));

export default function useLang() {
  const route = useRoute();

  const langParam = route.params.lang;
  const langName = allLangs.find((l) => l.id === langParam)?.name;

  if (langName) {
    return { langParam, langName, allLangs };
  }
  return { allLangs };
}
