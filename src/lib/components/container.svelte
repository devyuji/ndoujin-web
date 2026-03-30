<script lang="ts">
	import type { Snippet } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	interface PropsType {
		children: Snippet;
		class?: string;
	}

	let { children, class: className }: PropsType = $props();
</script>

<div class={twMerge(`md:max-w-200 p-6 w-full ${className}`)}>
	{@render children()}
</div>
