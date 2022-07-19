<script lang="ts">
	import Icon from '@iconify/svelte';
	import convert from './convert';
	import { downloadFile, uploadFile } from './file-manager';
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

	function processFile() {
		uploadFile((c, n) => {
			const text = process(c, from, to);
			downloadFile(text, `${to.name} - ${n}`);
		}, '.txt');
	}

	function copy() {
		() => navigator.clipboard.writeText(output);
	}

	function reverse() {
		[from, to] = [to, from];
		input = output;
	}
</script>

<div id="table" class="flex flex-col w-full h-full sm:flex-row gap-4 p-4">
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
			<!-- <div class="btn">
			<Icon icon="ic:round-help-outline" />
		</div> -->
			<div class="btn" on:click={processFile}>
				<Icon icon="ic:round-upload-file" />
			</div>
		</div>
		<textarea
			class="bg-transparent flex-1"
			bind:value={input}
			placeholder={process(sample, null, from)}
		/>
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
			<div class="btn" on:click={copy}>
				<Icon icon="ic:round-content-copy" />
			</div>
			<div class="btn" on:click={reverse}>
				<Icon icon="ic:round-swap-horiz" />
			</div>
		</div>
		<textarea
			class="bg-slate-200 flex-1"
			value={output}
			placeholder={process(sample, null, to)}
			readonly
		/>
	</div>
</div>

<style lang="postcss">
	#table > div {
		@apply flex flex-col gap-4 flex-1;
	}
	textarea {
		@apply p-4 rounded-md resize-none;
	}
	select {
		@apply bg-transparent font-semibold capitalize;
		-webkit-appearance: none;
		-moz-appearance: none;
	}
</style>
