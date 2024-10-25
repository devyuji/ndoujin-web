<script lang="ts">
	import { fly } from 'svelte/transition';
	import Backdrop from './backdrop.svelte';

	interface PropsType {
		onClose: () => void;
	}

	let { onClose }: PropsType = $props();
</script>

<Backdrop {onClose}>
	<div
		transition:fly={{ y: 10, opacity: 0, duration: 250 }}
		class="p-4 text-lg font-medium bg-zinc-900 rounded-lg w-11/12 lg:w-96 grid gap-4"
		onclick={(e) => e.stopPropagation()}
	>
		<div class="flex justify-end">
			<button onclick={onClose} aria-label="close">
				<svg
					viewBox="0 0 24 24"
					width="24"
					height="24"
					stroke="currentColor"
					stroke-width="2"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"
					></line></svg
				>
			</button>
		</div>

		<p>
			This script will only work if the server does not use Cloudflare or similar protections that
			block automated requests.
		</p>
	</div>
</Backdrop>
