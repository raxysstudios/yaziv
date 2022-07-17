<script lang="ts">
	export let catalogue: string[];
	export let onselect: (a: string) => {};
</script>

<div class="font-semibold capitalize flex flex-col items-start gap-2 p-4">
	{#each catalogue as item}
		<p class="btn px-6 py-2" on:click={() => onselect(item)}>
			{item}
		</p>
	{/each}
</div>
