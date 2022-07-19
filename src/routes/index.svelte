<script lang="ts">
	import type { Converter } from '$lib/types';
	import { onMount } from 'svelte';
	import ConverterView from '$lib/converter-view.svelte';
	import CatalogueView from '$lib/catalogue-view.svelte';
	import Icon from '@iconify/svelte';
	import Raxys from '$lib/raxys.svelte';

	let catalogue = [] as string[];
	let language = '';
	let converter: Converter | undefined;

	onMount(async () => {
		catalogue = await fetch('catalogue.json').then((r) => r.json());
		language = localStorage.getItem('language') ?? '';
		if (language && catalogue.includes(language)) await load(language);
	});

	async function load(_language: string) {
		language = _language;
		converter = await fetch(`${language}.json`).then((r) => r.json());
		localStorage.setItem('language', language);
	}
</script>

<h3
	class="btn m-4 mb-0 p-2 flex flex-row gap-2 items-center capitalize relative"
	on:click={() => (converter = undefined)}
>
	<Icon icon="ic:baseline-menu" />
	{language}
	{#if !converter}
		<Raxys class="absolute right-2" />
	{/if}
</h3>

{#if converter}
	<div class="grid sm:grid-cols-2 sm:grid-rows-[auto_1fr] gap-4 p-4 h-screen">
		<div class="flex flex-row h-min" />
		<div class="flex flex-row h-min" />
		<ConverterView {converter} />
	</div>
{:else}
	<CatalogueView {catalogue} onselect={load} />
{/if}
