<script lang="ts">
	import convert from './convert';
	import type { Converter } from './types';

	export let converter: Converter;
	const pairs = converter.mappings[0].pairs;
	let input = '';
	$: output = convert(input, pairs);
</script>

<textarea class="bg-transparent" bind:value={input} placeholder={converter.sample} />
<textarea
	class="bg-slate-200"
	value={output}
	placeholder={convert(converter.sample ?? '', pairs)}
	readonly
/>

<style lang="postcss">
	textarea {
		@apply p-4 rounded-md resize-none;
	}
</style>
