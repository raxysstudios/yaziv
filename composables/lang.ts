import { onMounted } from 'vue'
import type { Lang } from '~/utils/types';

const allLangs = [
  {
    "id": "abq",
    "name": "abaza"
  },
  {
    "id": "abk",
    "name": "abkhaz"
  },
  {
    "id": "agx",
    "name": "aghul"
  },
  {
    "id": "xdq",
    "name": "kaitag"
  },
  {
    "id": "kum",
    "name": "kumyk"
  },
  {
    "id": "tkr",
    "name": "tsakhur"
  },
  {
    "id": "oss",
    "name": "ossetian",
    "flag": "iron"
  },
  {
    "id": "lez",
    "name": "lezgi"
  }
] as Lang[];

export default async function useLang() {
  const lang = useState('lang', () => '');
  const currentLang = computed(() => {
    return allLangs.find((l) => l.id === lang.value);
  });
  watch(lang, (val) => {
    localStorage.setItem('lang', val);
  });
  onMounted(async () => {
    lang.value = localStorage.getItem('lang') ?? '';
  });

  return { lang, currentLang, allLangs };
}