<script lang="ts">
	import Raxys from '$lib/raxys.svelte';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { langs, aiLangs } from '../langs';

	async function load(iso: string | null = null) {
		if (iso) localStorage.setItem('lang', iso);
		else iso = localStorage.getItem('lang');
		goto('/?lang=' + iso);
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<h3
	class="btn flex flex-row gap-2 capitalize relative items-center"
	style="height: 44px;"
	on:click={() => load()}
>
	<Icon icon="ic:round-menu-open" />
	yaziv
	<Raxys class="absolute right-0" />
</h3>

<div class="font-semibold capitalize flex flex-col gap-1 pb-2 items-stretch">
	{#each Object.entries(langs) as [iso, name]}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<p class="btn flex flex-row px-6 pl-10 items-center" on:click={() => load(iso)}>
			<span class="flex-1">{name}</span>
			{#if aiLangs.includes(iso)}
				<Icon icon="fluent-emoji:robot" />
			{/if}
		</p>
	{/each}
</div>
