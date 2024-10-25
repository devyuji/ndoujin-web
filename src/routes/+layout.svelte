<script lang="ts">
	import Footer from '$lib/components/footer.svelte';
	import Navbar from '$lib/components/navbar.svelte';
	import type { Snippet } from 'svelte';
	import '../app.css';

	interface PropsType {
		children: Snippet;
	}

	let { children }: PropsType = $props();
</script>

<Navbar />

{@render children()}

<Footer />
