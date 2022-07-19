<script lang="ts">
	import Icon from '@iconify/svelte';
	import convert from './convert';
	import type { Converter, Mapping, Pairs } from './types';

	export let converter: Converter;
	let from = converter.mappings[0];
	let to = converter.mappings[1];

	$: sample = process(converter.sample ?? '', converter.mappings[0]);

	let input = '';
	$: output = process(input, from, to);

	function process(input: string, from: Mapping | null = null, to: Mapping | null = null) {
		let intermediate = input;
		if (from) intermediate = convert(intermediate, from.pairs);
		if (to) {
			const pairs = to.pairs.map((p) => p.slice().reverse()) as Pairs;
			intermediate = convert(intermediate, pairs);
		}
		return intermediate;
	}

	function copy() {
		() => navigator.clipboard.writeText(output);
	}

	function reverse() {
		[from, to] = [to, from];
		input = output;
	}
</script>

<div
	class="grid sm:grid-cols-2 grid-rows-[auto_auto_1fr_1fr] sm:grid-rows-[auto_1fr] gap-4 p-4 h-full"
>
	<div class="flex flex-row gap-2 h-min">
		<select class="flex-1 btn" bind:value={from}>
			{#each converter.mappings as mapping, i}
				<option value={mapping}>
					{i + 1}.
					{mapping.name}
				</option>
			{/each}
		</select>
		<!-- <div class="btn">
			<Icon icon="ic:round-help-outline" />
		</div> -->
		<div class="btn">
			<Icon icon="ic:round-upload-file" />
		</div>
	</div>
	<div class="flex flex-row gap-2 h-min">
		<select class="flex-1 btn" bind:value={to}>
			{#each converter.mappings as mapping, i}
				<option value={mapping}>
					{i + 1}.
					{mapping.name}
				</option>
			{/each}
		</select>
		<div class="btn" on:click={copy}>
			<Icon icon="ic:round-content-copy" />
		</div>
		<div class="btn" on:click={reverse}>
			<Icon icon="ic:round-swap-horiz" />
		</div>
	</div>
	<textarea class="bg-transparent" bind:value={input} placeholder={process(sample, null, from)} />
	<textarea class="bg-slate-200" value={output} placeholder={process(sample, null, to)} readonly />
</div>

<style lang="postcss">
	textarea {
		@apply p-4 rounded-md resize-none;
	}
	select {
		@apply bg-transparent font-semibold capitalize;
		-webkit-appearance: none;
		-moz-appearance: none;
	}
</style>
