// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
// A static site: every page, with its Contentful content, is built ahead of time and served as files,
// so no Worker code runs per request (Workers Free has no limit on static asset requests).
export default defineConfig({
	site: 'https://theagecollective.com',
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
			name: 'Outfit',
			cssVariable: '--font-body',
			weights: ['200 800'],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['Verdana', 'sans-serif'],
		},
	],
});
