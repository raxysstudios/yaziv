export type Pairs = [string, string][];

export type Mapping = {
  name: string;
  pairs: Pairs;
};

export type Converter = {
  sample?: string;
  default?: [number, number];
  mappings: Mapping[];
};
