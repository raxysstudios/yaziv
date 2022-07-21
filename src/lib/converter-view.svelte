<script lang="ts">
	import Icon from '@iconify/svelte';
	import { processText, processFile } from './process';
	import MappingView from './mapping-view.svelte';
	import type { Converter } from './types';

	export let converter: Converter;
	let from = converter.mappings[0];
	let to = converter.mappings[1];

	let showMapping = false;
	$: sample = processText(converter.sample ?? '', converter.mappings[0]);

	let input = '';
	$: output = processText(input, from, to);

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
				{#each converter.mappings as m, i}
					{#if !m.partial}
						<option value={m}>
							{i + 1}.
							{m.name}
						</option>
					{/if}
				{/each}
			</select>
			<div class="btn" on:click={() => processFile(from, to)}>
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
				placeholder={processText(sample, null, from)}
			/>
		{/if}
	</div>
	<div>
		<div class="flex flex-row gap-2 h-min">
			<select class="flex-1 btn" bind:value={to}>
				{#each converter.mappings as m, i}
					<option value={m}>
						{i + 1}.
						{m.name}
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
				placeholder={processText(sample, null, to)}
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
