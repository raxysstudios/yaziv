<script lang="ts">
	import convert from '$lib/convert';
	import { downloadFile, uploadFile } from '$lib/file-manager';
	import type { Pairs } from '$lib/types';
	import Icon from '@iconify/svelte';

	let input = '';
	$: output = convert(input, pairs);

	let config = '';
	$: pairs = <Pairs>config.split('\n').map((l) => l.split('.').splice(0, 2));

	function exportJson() {
		alert(JSON.stringify(pairs));
	}

	function importJson() {
		const pairs = <Pairs>JSON.parse(prompt('enter pairs json') ?? '');
		config = pairs.map((p) => p[0] + '.' + p[1]).join('\n');
	}
</script>

<div class="flex flex-row gap-4">
	<div class="flex flex-col">
		<p>Original text</p>
		<textarea class="w-64 h-32" bind:value={input} />
		<div class="h-4" />
		<p>Converted text</p>
		<textarea class="w-64 h-32" value={output} readonly />
	</div>
	<div class="flex flex-col">
		<p>Conversion pairs</p>
		<p class="text-sm">a pair per line, elements in a pair split by a dot (.)</p>
		<textarea class="h-64" bind:value={config} />
		<div class="flex">
			<div class="btn" on:click={exportJson}>To JSON</div>
			<div class="btn" on:click={importJson}>From JSON</div>
		</div>
	</div>
</div>
