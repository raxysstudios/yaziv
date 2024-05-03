import { convert } from './converter';
import { downloadFile, uploadFile } from './file-manager';
import type { Mapping, Pairs } from './types';

export function processText(input: string, from: Mapping | null = null, to: Mapping | null = null) {
  let intermediate = input;
  if (to?.lowercase) intermediate = intermediate.toLowerCase();
  if (from) intermediate = convert(intermediate, from.pairs);
  if (to) {
    const pairs = to.pairs.map((p) => p.slice().reverse()) as Pairs;
    intermediate = convert(intermediate, pairs);
  }
  return intermediate;
}

export function processFile(from: Mapping | undefined, to: Mapping | undefined) {
  uploadFile((c, n) => {
    const text = processText(c, from, to);
    downloadFile(text, `${to?.name} - ${n}`);
  }, '.txt');
}