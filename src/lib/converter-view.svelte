<script lang="ts">
	import convert from './convert';
	import type { Converter } from './types';

	export let converter: Converter;
	const pairs = converter.mappings[0].pairs;
	let input = '';
	$: output = convert(input, pairs);
</script>

<div class="grid sm:grid-cols-2 gap-4 p-4 h-screen relative">
	<textarea class="bg-transparent" bind:value={input} placeholder={converter.sample} />
	<textarea
		class="bg-slate-200"
		value={output}
		placeholder={convert(converter.sample ?? '', pairs)}
		readonly
	/>
</div>

<a
	class="absolute m-4 right-0 bottom-0 origin-bottom-right opacity-10 hover:scale-105"
	href="https://raxys.app"
>
	<img
		class="w-16 thm-img"
		src="https://raw.githubusercontent.com/raxysstudios/raxys/main/src/lib/assets/icons/raxys-loop.png"
		alt="raxys"
	/>
</a>

<style lang="postcss">
	textarea {
		@apply p-4 rounded-md;
	}
</style>
