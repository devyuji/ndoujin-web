<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';

	interface PropsType {
		children: Snippet;
		onClose: () => void;
	}

	$effect(() => {
		document.body.style.overflow = 'hidden';

		return () => (document.body.style.overflow = 'visible');
	});

	let { children, onClose }: PropsType = $props();
</script>

<div
	transition:fade={{ duration: 550 }}
	onclick={onClose}
	class="fixed w-full h-full top-0 left-0 right-0 bg-black/50 backdrop-blur-sm z-10 grid place-items-center"
>
	{@render children()}
</div>
