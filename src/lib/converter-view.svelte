<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Converter } from '$lib/types';
	import { processText, processFile } from '$lib/process';
	import MappingView from '$lib/mapping-view.svelte';
	import { goto } from '$app/navigation';
	import { langs } from '../routes/langs';
	import VoiceView from '$lib/voice-view.svelte';

	export let converter: Converter;
	let from = converter.mappings[converter.default?.[0] ?? 0];
	let to = converter.mappings[converter.default?.[1] ?? 1];

	let showMapping = false;
	$: sample = processText(converter.sample ?? '', converter.mappings[0]);

	let input = '';
	$: output = processText(input, from, to);

	let ai = false;

	function copy() {
		navigator.clipboard.writeText(output);
	}

	function reverse() {
		[from, to] = [to, from];
		input = output;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<h3
	class="btn flex flex-row gap-2 items-center capitalize relative"
	style="height: 44px;"
	on:click={() => goto('/menu')}
>
	<Icon icon="ic:round-menu" />
	<span>{langs[converter.iso]}</span>
</h3>

<div id="table" class="flex flex-col w-full h-full sm:flex-row gap-4">
	<div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="flex flex-row gap-2 h-min">
			<select class="flex-1 btn" bind:value={from}>
				{#each converter.mappings as m}
					{#if m.constraint != 'to'}
						<option value={m}>
							{m.name}
						</option>
					{/if}
				{/each}
			</select>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="btn" on:click={() => processFile(from, to)}>
				<Icon icon="ic:round-upload-file" />
			</div>
			<div class="btn" on:click={() => (showMapping = !showMapping)}>
				<Icon icon={showMapping ? 'ic:round-keyboard-hide' : 'ic:round-keyboard'} />
			</div>
			{#if to.constraint != 'from'}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="btn" on:click={reverse}>
					<Icon icon="ic:round-swap-horiz" />
				</div>
			{/if}
		</div>
		{#if showMapping}
			<MappingView mapping={from} />
		{:else}
			<textarea
				class="bg-transparent flex-1"
				bind:value={input}
				placeholder={processText(sample, null, from)}
				dir={from.rtl ? 'rtl' : 'auto'}
			/>
		{/if}
	</div>
	<div>
		<div class="flex flex-row gap-2 h-min">
			{#if ai}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="btn flex flex-row gap-2 flex-1 justify-center" on:click={() => (ai = false)}>
					<Icon icon="fluent-emoji:robot" />
					<span class="font-semibold">Meta AI</span>
				</div>
			{:else}
				<select class="flex-1 btn" bind:value={to}>
					{#each converter.mappings as m}
						<option value={m}>
							{m.name}
						</option>
					{/each}
				</select>
				{#if output}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div class="btn" on:click={copy}>
						<Icon icon="ic:round-content-copy" />
					</div>
				{/if}
				{#if converter.voice?.tts}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div class="btn" on:click={() => (ai = true)}>
						<Icon icon="fluent-emoji:robot" />
					</div>
				{/if}
			{/if}
		</div>
		{#if ai}
			<VoiceView
				iso={converter.iso}
				input={input
					? converter.voice?.intact
						? input
						: processText(input, from, converter.mappings[0])
					: converter.sample}
			/>
		{:else if showMapping}
			<MappingView mapping={to} reverse={true} />
		{:else}
			<textarea
				class="card flex-1"
				value={output}
				placeholder={processText(sample, null, to)}
				dir={to.rtl ? 'rtl' : 'auto'}
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
