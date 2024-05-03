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
  const currLang = useState('currLang', () => '');

  watch(lang, (val) => {
    localStorage.setItem('lang', val);
  });

  watch(currLang, (val) => {
    localStorage.setItem('currLang', val)
    console.log('from lang.ts:', currLang.value);

  });

  onMounted(async () => {
    lang.value = localStorage.getItem('lang') ?? '';
    currLang.value = localStorage.getItem('currLang') ?? '';
  });



  return { lang, currLang, allLangs };
}