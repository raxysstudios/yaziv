import type { Lang } from "~/utils/types";

const allLangs = [
  {
    id: "abq",
    name: "Abaza",
  },
  {
    id: "abk",
    name: "Abkhaz",
  },
  {
    id: "agx",
    name: "Aghul",
  },
  {
    id: "xdq",
    name: "Kaitag",
  },
  {
    id: "kum",
    name: "Kumyk",
  },
  {
    id: "tkr",
    name: "Tsakhur",
  },
  {
    id: "oss",
    name: "ossetian",
    flag: "iron",
  },
  {
    id: "lez",
    name: "Lezgi",
  },
  {
    id: "kat",
    name: "Georgian",
  },
] as Lang[];
allLangs.sort((a, b) => a.name.localeCompare(b.name));

export default function useLang() {
  const route = useRoute();

  const langParam = route.params.lang;
  const langName = allLangs.find((l) => l.id === langParam)?.name;

  if (langName) {
    return { langParam, langName, allLangs };
  }
  return { allLangs };
}
