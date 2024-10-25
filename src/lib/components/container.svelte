<script lang="ts">
	import type { Snippet } from 'svelte';

	interface PropsType {
		children: Snippet;
		class?: string;
		width?: string;
	}

	let { children, class: className, width = 'md:max-w-[55rem]' }: PropsType = $props();
</script>

<div class={`${width} p-6 w-full ${className}`}>
	{@render children()}
</div>
