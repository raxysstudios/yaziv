export type Lang = {
  id: string;
  name: Record<string, string>;
  flag?: string;
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

export type LanguageConfig = {
  iso: string;
  sample?: string;
  default?: [string, string];
  mappings: string[];
};
