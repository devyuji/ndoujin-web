<script lang="ts">
	import Footer from '$lib/components/footer.svelte';
	import Navbar from '$lib/components/navbar.svelte';
	import type { Snippet } from 'svelte';
	import IndexedDB from '$lib/state/db.svelte';
	import '../app.css';

	interface PropsType {
		children: Snippet;
	}

	let { children }: PropsType = $props();

	$effect(() => {
		if (!('indexedDB' in window)) {
			console.log("This browser doesn't support IndexedDB");
			return;
		}

		IndexedDB.init();
	});
</script>

<Navbar />

{@render children()}

<Footer />
