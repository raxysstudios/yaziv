export type Lang = {
  id: string;
  name: Record<string, string>;
  flag?: string;
};

export type Pairs = [string, string][];

export type Mapping = {
  name: string;
  constraint?: "to" | "from";
  rtl?: boolean;
  lowercase?: boolean;
  pairs: Pairs;
};

export type ConverterConfig = {
  iso: string;
  sample?: string;
  default?: [number, number];
  mappings: Mapping[];
};
