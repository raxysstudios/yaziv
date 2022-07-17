<script lang="ts">
	export let catalogue: string[];
	export let onselect: (a: string) => {};
</script>

<div class="flex flex-row flex-wrap gap-4">
	{#each catalogue as item}
		<p on:click={() => onselect(item)}>
			{item}
		</p>
	{/each}
</div>
