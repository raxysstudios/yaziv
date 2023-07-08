import { client } from '@gradio/client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let app: any;
export async function predict(iso: string, input: string) {
	app ??= await client('https://mms-meta-mms--rt5v2.hf.space/');
	const result = await app.predict('/predict_1', [input, iso, 0.9]);
	const url = result.data[0].value.name;
	return 'https://mms-meta-mms--rt5v2.hf.space/file=' + url;
}
