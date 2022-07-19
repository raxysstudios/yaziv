<script lang="ts">
	import Icon from '@iconify/svelte';
	import convert from './convert';
	import type { Converter, Mapping } from './types';

	export let converter: Converter;
	let mappingFrom: Mapping;
	let mappingTo: Mapping;

	const pairs = converter.mappings[0].pairs;
	let input = '';
	$: output = convert(input, pairs);
</script>

<div
	class="grid sm:grid-cols-2 grid-rows-[auto_auto_1fr_1fr] sm:grid-rows-[auto_1fr] gap-4 p-4 h-full"
>
	<div class="flex flex-row gap-2 h-min">
		<select class="flex-1 btn" bind:value={mappingFrom}>
			{#each converter.mappings as mapping, i}
				<option value={mapping}>
					{i + 1}.
					{mapping.name}
				</option>
			{/each}
		</select>
		{#if converter.sample}
			<div class="btn">
				<Icon icon="ic:round-upload-file" />
			</div>
		{/if}
	</div>
	<div class="flex flex-row gap-2 h-min">
		<select class="flex-1 btn" bind:value={mappingTo}>
			{#each converter.mappings as mapping, i}
				<option value={mapping}>
					{i + 1}.
					{mapping.name}
				</option>
			{/each}
		</select>
		<div class="btn" on:click={() => navigator.clipboard.writeText(output)}>
			<Icon icon="ic:round-content-copy" />
		</div>
	</div>
	<textarea class="bg-transparent" bind:value={input} placeholder={converter.sample} />
	<textarea
		class="bg-slate-200"
		value={output}
		placeholder={convert(converter.sample ?? '', pairs)}
		readonly
	/>
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
