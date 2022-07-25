export type Pairs = [string, string][];

export type Mapping = {
	name: string;
	partial: boolean | undefined;
	rtl: boolean | undefined;
	lowercase: boolean | undefined;
	pairs: Pairs;
};

export type Converter = {
	sample?: string;
	default?: [number, number];
	mappings: Mapping[];
};
