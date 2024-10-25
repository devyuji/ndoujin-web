import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				montserret: "'Montserrat', sans-serif;"
			}
		}
	},

	plugins: []
} as Config;
