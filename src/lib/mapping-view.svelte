<script lang="ts">
	import type { Mapping } from './types';

	export let mapping: Mapping;
</script>

<div class="{$$props.class} flex flex-row flex-wrap gap-1 text-sm">
	{#each mapping.pairs as p}
		<p class="bg-slate-200 dark:bg-gray-700 rounded-md px-1">
			{p[0]} <span class="opacity-50">{p[1]}</span>
		</p>
	{/each}
</div>
