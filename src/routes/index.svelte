<script lang="ts">
	import type { Converter } from '$lib/types';
	import { onMount } from 'svelte';
	import ConverterView from '$lib/converter-view.svelte';
	import CatalogueView from '$lib/catalogue-view.svelte';
	import Icon from '@iconify/svelte';
	import Raxys from '$lib/raxys.svelte';
	import { initFileManager } from '$lib/file-manager';

	let catalogue = [] as string[];
	let language = '';
	let converter: Converter | undefined;

	onMount(async () => {
		initFileManager();
		catalogue = await fetch('catalogue.json').then((r) => r.json());
		language = localStorage.getItem('language') ?? '';
		if (language && catalogue.includes(language)) await load(language);
	});

	async function load(_language: string) {
		language = _language;
		converter = await fetch(`${language}.json`).then((r) => r.json());
		localStorage.setItem('language', language);
	}

	function toggleMenu() {
		if (converter) converter = undefined;
		else load(language);
	}
</script>

<h3 class="btn m-4 mb-0 flex flex-row gap-2 items-center capitalize relative" on:click={toggleMenu}>
	<Icon icon={converter ? 'ic:round-menu' : 'ic:round-menu-open'} />
	{language}
	{#if !converter}
		<Raxys class="absolute right-0" />
	{/if}
</h3>

{#if converter}
	<ConverterView {converter} />
{:else}
	<CatalogueView {catalogue} onselect={load} />
{/if}
