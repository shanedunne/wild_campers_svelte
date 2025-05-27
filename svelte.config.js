import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			// default options are fine for most cases
			pages: 'build', // Default: directory to write prerendered pages to
			assets: 'build', // Default: directory to write static assets to
			fallback: undefined, // Default: no fallback (for SPAs, you might use 'index.html' or '200.html')
			precompress: false, // Default
			strict: true // Default
		})
	}
};

export default config;
