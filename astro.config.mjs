// @ts-check
import cloudflare from '@astrojs/cloudflare';
import { cacheCloudflare } from '@astrojs/cloudflare/cache';
import react from '@astrojs/react';
import { d1, r2 } from '@emdash-cms/cloudflare';
import { defineConfig, fontProviders } from 'astro/config';
import emdash from 'emdash/astro';

// Public pages are cached at the edge; a cache hit never runs the Worker (keeps us inside the
// Workers Free 10 ms CPU limit). Pages that query EmDash must also call
// `Astro.cache.set(cacheHint)` so publishing purges them. 'all' is the purge-everything tag.
// Every public route needs a rule here: a route without one renders on every request.
const cached = { maxAge: 86_400, swr: 604_800, tags: ['all'] };

// https://astro.build/config
export default defineConfig({
	site: 'https://theagecollective.com',
	// EmDash serves the admin and current content at runtime, so the site renders on the Worker.
	output: 'server',
	adapter: cloudflare(),
	cache: { provider: cacheCloudflare() },
	// Routes from SITE-STRUCTURE.md. No root rest params: they would also match /_emdash/.
	routeRules: Object.fromEntries(
		[
			'/',
			'/stories',
			'/stories/[slug]',
			'/projects',
			'/projects/gold',
			'/projects/my-aging-story',
			'/resources',
			'/about',
			'/privacy',
			'/terms',
		].map((route) => [route, cached]),
	),
	integrations: [
		react(),
		emdash({
			database: d1({ binding: 'DB', session: 'auto', coalesce: true }),
			storage: r2({ binding: 'MEDIA' }),
			// Cached pages are identical for everyone; editors get an Edit pill that loads a fresh ?_edit render.
			toolbar: 'client',
		}),
	],
	// Downloaded and self-hosted at build time; nothing is requested from Google at runtime.
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Besley',
			cssVariable: '--font-display',
			weights: ['400 900'],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['Rockwell', 'Georgia', 'serif'],
		},
		{
			provider: fontProviders.google(),
			name: 'Atkinson Hyperlegible Next',
			cssVariable: '--font-body',
			weights: ['200 800'],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['Verdana', 'sans-serif'],
		},
	],
});
