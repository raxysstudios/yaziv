export type Pairs = [string, string][];

export type Mapping = {
	name: string;
	constraint?: 'to' | 'from';
	rtl?: boolean;
	lowercase?: boolean;
	pairs: Pairs;
};

export type Converter = {
	iso: string;
	voice?: {
		tts?: boolean;
		asr?: boolean;
		intact?: boolean;
	};
	sample?: string;
	default?: [number, number];
	mappings: Mapping[];
};
