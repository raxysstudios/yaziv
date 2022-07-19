<script lang="ts">
	export let catalogue: string[];
	export let onselect: (a: string) => {};
</script>

<div class="font-semibold capitalize flex flex-col gap-2 p-4 items-stretch">
	{#each catalogue as item}
		<p class="btn px-6 pl-10" on:click={() => onselect(item)}>
			{item}
		</p>
	{/each}
</div>
