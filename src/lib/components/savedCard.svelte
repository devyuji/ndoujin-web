<script lang="ts">
	import type { SavedType } from '$lib/state/db.svelte';
	import Reading from './modal/reading.svelte';
	import db from '$lib/state/db.svelte';
	import { fly } from 'svelte/transition';

	interface PropsType {
		data: SavedType;
	}

	let { data }: PropsType = $props();

	let openReader = $state(false);
	let isMenuOpen = $state(false);

	function open() {
		openReader = true;
	}
	function close() {
		openReader = false;
	}

	function truncateText(text: string) {
		return text.substring(0, 50) + '...';
	}

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	async function deleteIt() {
		await db.delete(data.code);
	}
</script>

<div>
	<div class="flex items-center justify-end relative">
		<button type="button" aria-label="menu" onclick={toggleMenu}>
			<svg
				viewBox="0 0 24 24"
				width="24"
				height="24"
				stroke="currentColor"
				stroke-width="2"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="css-i6dzq1"
				><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle
					cx="5"
					cy="12"
					r="1"
				></circle></svg
			>
		</button>
		{#if isMenuOpen}
			<div
				transition:fly={{ y: 20, duration: 125 }}
				class="absolute top-5 right-0 bg-zinc-900 z-10 p-2"
			>
				<ul class="grid gap-2">
					<li>
						<button onclick={deleteIt} type="button">Delete</button>
					</li>
				</ul>
			</div>
		{/if}
	</div>
	<button class="flex flex-col gap-2 max-w-72" type="button" onclick={open}>
		<div class="h-60 relative bg-zinc-800">
			<img src={data.cover} alt="" class="absoulte h-full w-full object-contain" />
		</div>

		<div class="text-left">
			<p class="text-clip text_truncate leadin">{truncateText(data.name)}</p>
		</div>
	</button>
</div>
{#if openReader}
	<Reading loading={false} images={data.imageUrls} onClose={close} />
{/if}
