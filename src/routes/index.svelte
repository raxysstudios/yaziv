<script lang="ts">
	import type { Converter } from '$lib/types';
	import { onMount } from 'svelte';
	import ConverterView from '$lib/converter-view.svelte';
	import CatalogueView from '$lib/catalogue-view.svelte';
	import Icon from '@iconify/svelte';
	import Raxys from '$lib/raxys.svelte';

	let catalogue = [] as string[];
	let converter: Converter | undefined;

	onMount(async () => {
		catalogue = await fetch('catalogue.json').then((r) => r.json());
		const l = localStorage.getItem('language');
		if (l && catalogue.includes(l)) await load(l);
	});

	async function load(language: string) {
		converter = await fetch(`${language}.json`).then((r) => r.json());
		localStorage.setItem('language', language);
	}
</script>

{#if converter}
	<div class="grid sm:grid-cols-2 sm:grid-rows-[auto_1fr] gap-4 p-4 h-screen">
		<div class="flex flex-row h-min">
			<div on:click={() => (converter = undefined)} class="flex flex-row">
				<div class="btn p-2">
					<Icon icon="ic:baseline-menu" />
				</div>
			</div>
		</div>
		<div class="flex flex-row h-min">
			<div class="flex-1" />
			<Raxys />
		</div>
		<ConverterView {converter} />
	</div>
{:else}
	<CatalogueView {catalogue} onselect={load} />
{/if}
