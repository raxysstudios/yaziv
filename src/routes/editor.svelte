<script lang="ts">
	import convert from '$lib/convert';
	import { downloadFile, uploadFile } from '$lib/file-manager';
	import type { Pairs } from '$lib/types';
	import Icon from '@iconify/svelte';

	let input = '';
	$: output = convert(input, pairs);

	let config = '';
	$: pairs = <Pairs>config.split('\n').map((l) => l.split('.').splice(0, 2));

	function downloadPairs() {
		downloadFile(JSON.stringify(pairs), 'yaziv.json');
	}

	function uploadPairs() {
		uploadFile((c, _) => {
			config = (<Pairs>JSON.parse(c)).map((p) => p.join('.')).join('\n');
		});
	}
</script>

<div class="flex flex-row gap-4">
	<div class="flex flex-col gap-2">
		<textarea bind:value={input} />
		<textarea value={output} readonly />
	</div>
	<textarea bind:value={config} />
	<div class="btn" on:click={downloadPairs}>
		<Icon icon="ic:round-file-download" />
	</div>
	<div class="btn" on:click={uploadPairs}>
		<Icon icon="ic:round-upload-file" />
	</div>
</div>
