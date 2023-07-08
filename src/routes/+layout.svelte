<script lang="ts">
	import { goto } from '$app/navigation';
	import { langs } from './langs';
	import { onMount } from 'svelte';

	onMount(() => {
		const iso = localStorage.getItem('lang');
		if (iso && iso in langs) goto('/?lang=' + iso);
	});
</script>

<slot />
