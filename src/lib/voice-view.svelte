<script lang="ts">
	import debounce from 'just-debounce-it';
	import { predict } from './voice';

	export let iso = '';
	export let input = '';
	let loading = false;
	let src = '';

	const hardOperation = debounce((_: unknown) => run(), 400);
	$: {
		loading = true;
		hardOperation(input);
	}

	async function run() {
		src = await predict(iso, input);
		loading = false;
	}
</script>

<div class="flex flex-col flex-1 justify-center items-center">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	{#if loading}
		<div
			class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"
			role="status"
		/>
	{:else if src}
		<audio autoplay controls {src} />
	{/if}
</div>
