import { client } from '@gradio/client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let app: any;
export async function predict(iso: string, input: string) {
	const base = 'https://mms-meta-mms--dzmwz.hf.space/';
	app ??= await client(base);
	const result = await app.predict('/predict_1', [input, iso, 0.9]);
	const url = result.data[0].value.name;
	return base + 'file=' + url;
}
