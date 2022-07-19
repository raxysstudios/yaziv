export type Pairs = [string, string][];

export type Mapping = {
  name: string;
  partial: boolean | undefined;
  pairs: Pairs;
};

export type Converter = {
  sample?: string;
  default?: [number, number];
  mappings: Mapping[];
};
