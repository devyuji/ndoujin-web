<script lang="ts">
	import type { SavedType } from '$lib/state/db.svelte';
	import Reading from './modal/reading.svelte';

	interface PropsType {
		data: SavedType;
	}

	let { data }: PropsType = $props();

	let openReader = $state(false);

	function open() {
		openReader = true;
	}
	function close() {
		openReader = false;
	}

	function truncateText(text: string) {
		var truncated = text.substring(0, 50) + '...';
		return truncated;
	}
</script>

<button class="flex flex-col gap-2 max-w-72" type="button" onclick={open}>
	<div class="h-60 relative bg-zinc-800 rounded-md">
		<img src={data.cover} alt="" class="absoulte h-full w-full object-contain" />
	</div>

	<div class="text-left">
		<p class="text-clip text_truncate leadin">{truncateText(data.name)}</p>
	</div>
</button>

{#if openReader}
	<Reading loading={false} images={data.imageUrls} onClose={close} />
{/if}
