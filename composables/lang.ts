import type { Lang } from "~/utils/types";

const allLangs = [
  {
    id: "abq",
    name: "abaza",
  },
  {
    id: "abk",
    name: "abkhaz",
  },
  {
    id: "agx",
    name: "aghul",
  },
  {
    id: "xdq",
    name: "kaitag",
  },
  {
    id: "kum",
    name: "kumyk",
  },
  {
    id: "tkr",
    name: "tsakhur",
  },
  {
    id: "oss",
    name: "ossetian",
    flag: "iron",
  },
  {
    id: "lez",
    name: "lezgi",
  },
  {
    id: "kat",
    name: "georgian",
  },
] as Lang[];

export default function useLang() {
  const lang = useState("lang", () => "");
  allLangs.sort((a, b) => a.name.localeCompare(b.name));
  return { lang, allLangs };
}
