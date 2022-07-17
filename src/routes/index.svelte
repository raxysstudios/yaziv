<script lang="ts">
	import type { Converter } from '$lib/types';
	import { onMount } from 'svelte';
	import ConverterView from '$lib/converter-view.svelte';
	import CatalogueView from '$lib/catalogue-view.svelte';

	let catalogue = [] as string[];
	let converter: Converter | undefined;

	onMount(async () => {
		catalogue = await fetch('catalogue.json').then((r) => r.json());
	});

	async function load(lang: string) {
		converter = await fetch(`${lang}.json`).then((r) => r.json());
	}
</script>

{#if converter}
	<ConverterView {converter} />
{:else}
	<CatalogueView {catalogue} onselect={load} />
{/if}
