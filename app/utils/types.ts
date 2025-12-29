export type Lang = {
  id: string;
  name: Record<string, string>;
};

export type Constraint = "<" | ">";
export type Pair = [string, string, Constraint?];

export type Mapping = {
  id: string;
  name: Record<string, string>;
  constraint?: Constraint;
  rtl?: boolean;
  lowercase?: boolean;
  pairs: Pair[];
};

export type ConverterConfig = {
  iso: string;
  sample?: string;
  defaultPair: [string, string];
  mappings: string[];
};
