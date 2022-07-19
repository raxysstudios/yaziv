<script lang="ts">
	import Icon from '@iconify/svelte';
	import convert from './convert';
	import { downloadFile, uploadFile } from './file-manager';
	import MappingView from './mapping-view.svelte';
	import type { Converter, Mapping, Pairs } from './types';

	export let converter: Converter;
	let from = converter.mappings[0];
	let to = converter.mappings[1];

	let showMapping = false;
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

	function processFile() {
		uploadFile((c, n) => {
			const text = process(c, from, to);
			downloadFile(text, `${to.name} - ${n}`);
		}, '.txt');
	}

	function copy() {
		navigator.clipboard.writeText(output);
	}

	function reverse() {
		[from, to] = [to, from];
		input = output;
	}
</script>

<div id="table" class="flex flex-col w-full h-full sm:flex-row gap-4">
	<div>
		<div class="flex flex-row gap-2 h-min">
			<select class="flex-1 btn" bind:value={from}>
				{#each converter.mappings as mapping, i}
					<option value={mapping}>
						{i + 1}.
						{mapping.name}
					</option>
				{/each}
			</select>
			<div class="btn" on:click={processFile}>
				<Icon icon="ic:round-upload-file" />
			</div>
			<div class="btn" on:click={() => (showMapping = !showMapping)}>
				<Icon icon={showMapping ? 'ic:round-keyboard-hide' : 'ic:round-keyboard'} />
			</div>
		</div>
		{#if showMapping}
			<MappingView mapping={from} />
		{:else}
			<textarea
				class="bg-transparent flex-1"
				bind:value={input}
				placeholder={process(sample, null, from)}
			/>
		{/if}
	</div>
	<div>
		<div class="flex flex-row gap-2 h-min">
			<select class="flex-1 btn" bind:value={to}>
				{#each converter.mappings as mapping, i}
					<option value={mapping}>
						{i + 1}.
						{mapping.name}
					</option>
				{/each}
			</select>
			{#if output}
				<div class="btn" on:click={copy}>
					<Icon icon="ic:round-content-copy" />
				</div>
			{/if}
			{#if !to.partial}
				<div class="btn" on:click={reverse}>
					<Icon icon="ic:round-swap-horiz" />
				</div>
			{/if}
		</div>
		{#if showMapping}
			<MappingView mapping={to} reverse={true} />
		{:else}
			<textarea
				class="card flex-1"
				value={output}
				placeholder={process(sample, null, to)}
				readonly
			/>
		{/if}
	</div>
</div>

<style lang="postcss">
	#table > div {
		@apply flex flex-col gap-2 flex-1;
	}
	textarea {
		@apply p-2 rounded-md resize-none;
	}
	select {
		@apply font-semibold capitalize;
		-webkit-appearance: none;
		-moz-appearance: none;
	}
</style>
