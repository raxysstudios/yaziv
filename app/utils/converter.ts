import type { Pair, Mapping } from "./types";

export function chainConvert(text: string, from?: Mapping, to?: Mapping) {
  if (to?.lowercase) text = text.toLowerCase();
  if (from) text = convert(text, from.pairs);
  if (to) {
    const pairs = to.pairs.map((p) => <Pair>[
      p[1], p[0],
      p[2]
        ? p[2] == '<' ? '>' : '<'
        : undefined,
    ]);
    text = convert(text, pairs);
  }
  return text;
}

export function convert(input: string, pairs: Pair[]) {
  input = " " + input.replace(/\n/g, "\n ").trim();
  const output = [] as string[];

  for (let i = 0; i < input.length;) {
    let found = false;

    for (const [from, to, ct] of pairs) {
      if (ct == '<') continue;
      const pairs = [
        [from, to],
        [capitalize(from), capitalize(to)],
        [from.toUpperCase(), to.toUpperCase()],
      ];

      const text = input.substring(i, i + from.length);
      for (const [from, to] of pairs) {
        if (text === from) {
          output.push(to!);
          i += from.length;
          found = true;
          break;
        }
      }
      if (found) break;
    }

    if (!found) {
      output.push(input[i] || "");
      i++;
    }
  }

  return output.join('').replace(/\n /g, "\n").trim();
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
