<script lang="ts">
	import { predict } from './voice';

	export let iso = '';
	export let input = '';
	let loading = false;
	let src = '';
	async function run() {
		console.log(input, iso);
		loading = true;
		src = await predict(iso, input);
		loading = false;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if input && iso}
	<p class="btn px-6 pl-10" on:click={run}>
		{loading ? '⚙️ Loading, please wait...' : '🗣️ Voice'}
	</p>
{/if}

{#if src && !loading}
	<audio controls {src} />
{/if}
