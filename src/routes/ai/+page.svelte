<script lang="ts">
	import { client } from '@gradio/client';

	let loading = false;
	let input = 'Цӕй ма, лӕппутӕ, бавналӕм,\nНӕ тыхтӕ иумӕ бавзарӕм!';
	let src = '';
	async function run() {
		loading = true;

		const app = await client('https://mms-meta-mms--rt5v2.hf.space/');
		const result: any = await app.predict('/predict_1', [input, 'oss', 1]);

		let url = result.data[0].value.name;
		src = 'https://mms-meta-mms--rt5v2.hf.space/file=' + url;
		loading = false;
	}
</script>

<textarea class="bg-transparent flex-1" bind:value={input} readonly={loading} />

<p class="btn px-6 pl-10" on:click={run}>
	{loading ? '⚙️ Loading, please wait...' : '🗣️ Voice'}
</p>

{#if src && !loading}
	<audio controls {src} />
{/if}
