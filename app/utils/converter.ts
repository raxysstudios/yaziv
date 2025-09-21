import type { Pairs, Mapping } from "./types";

export function convert(text: string, pairs: Pairs) {
  text = " " + text.replace(/\n/g, "\n ").trim();
  let result = "";

  for (let i = 0; i < text.length; ) {
    let found = false;
    for (const [from, to] of pairs) {
      if (!from || !to) continue;

      const l = from.length;
      const sub = text.substring(i, i + l);
      const pairs = [
        [from, to],
        [capitalize(from), capitalize(to)],
        [from.toUpperCase(), to.toUpperCase()],
      ];

      for (const [f, t] of pairs) {
        if (sub === f) {
          found = true;
          result += t;
          i += l;
          if (t && t[t.length - 1] === " ") i--;
          break;
        }
      }
      if (found) break;
    }
    if (!found) {
      result += text[i];
      i++;
    }
  }

  return result.replace(/\n /g, "\n").trim();
}

export function chainConvert(text: string, from?: Mapping, to?: Mapping) {
  if (to?.lowercase) text = text.toLowerCase();
  if (from) text = convert(text, from.pairs);
  if (to) {
    const pairs = to.pairs.map((p) => p.slice().reverse()) as Pairs;
    text = convert(text, pairs);
  }
  return text;
}

function capitalize(text: string) {
  let base = "";
  let i = 0;
  if (text.charAt(0) === " ") {
    base = " ";
    i = 1;
  }
  return base + text.charAt(i).toUpperCase() + text.slice(i + 1);
}
