import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { langs } from './langs';

export const load = (async ({ fetch, url }) => {
	const lang = url.searchParams.get('lang');
	if (!(lang && lang in langs)) throw redirect(308, '/menu');
	const res = await fetch(`langs/${lang}.json`);
	return await res.json();
}) satisfies PageLoad;
