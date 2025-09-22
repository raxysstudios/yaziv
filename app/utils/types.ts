export type Lang = {
  id: string;
  name: Record<string, string>;
};

export type Pairs = [string, string][];

export type Mapping = {
  id: string;
  name: Record<string, string>;
  constraint?: "to" | "from";
  rtl?: boolean;
  lowercase?: boolean;
  pairs: Pairs;
};

export type ConverterConfig = {
  iso: string;
  sample?: string;
  defaultPair: [string, string];
  mappings: string[];
};
