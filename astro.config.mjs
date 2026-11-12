// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
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
			name: 'Atkinson Hyperlegible Next',
			cssVariable: '--font-body',
			weights: ['200 800'],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['Verdana', 'sans-serif'],
		},
	],
});
