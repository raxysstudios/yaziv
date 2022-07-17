import type { Pairs } from "./types";

function capitalize(text: string) {
  let base = "";
  let i = 0;
  if (text.charAt(0) === " ") {
    base = " ";
    i = 1;
  }
  return base + text.charAt(i).toUpperCase() + text.slice(i + 1);
}

export default function convert(source: string, pairs: Pairs) {
  source = " " + source.replace(/\n/g, "\n ").trim();
  let result = "";

  for (let i = 0; i < source.length; ) {
    let found = false;
    for (const [from, to] of pairs) {
      if (!from || !to) continue;

      const l = from.length;
      const sub = source.substring(i, i + l);
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
          break;
        }
      }

      if (found) break;
    }

    if (!found) {
      result += source[i];
      i++;
    }
  }

  return result.replace(/\n /g, "\n").trim();
}
