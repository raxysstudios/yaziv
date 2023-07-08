<script lang="ts">
	import { goto } from '$app/navigation';
	import ConverterView from '$lib/converter-view.svelte';
	import type { Converter } from '$lib/types';
	import { langs } from './langs';
	import { onMount } from 'svelte';

	let converter: Converter | null = null;

	onMount(async () => {
		const iso = localStorage.getItem('lang');
		if (!(iso && iso in langs)) return goto('/menu');
		converter = await fetch(`langs/${iso}.json`).then((r) => r.json());
	});
</script>

{#if converter}
	<ConverterView {converter} />
{/if}
