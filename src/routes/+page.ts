import type { PageLoad } from './$types';

export const load = (async ({ fetch, url }) => {
	const lang = url.searchParams.get('lang');
	const res = await fetch(`langs/${lang}.json`);
	return await res.json();
}) satisfies PageLoad;
