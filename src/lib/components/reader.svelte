<script lang="ts">
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';

	interface Props {
		index: number;
		onClose: () => void;
	}

	let { index, onClose }: Props = $props();

	let idx = $state(index);
	let element = $state<HTMLDivElement>();

	const data: any = getContext('reader-data') ?? [];

	$effect(() => {
		document.body.style.overflow = 'hidden';
		window.addEventListener('keydown', keyPressed);

		return () => {
			window.removeEventListener('keydown', keyPressed);
			document.body.style.overflow = 'auto';
		};
	});

	function keyPressed(e: KeyboardEvent) {
		const key = e.key;

		switch (key) {
			case 'Escape':
				onClose();
				break;

			case 'ArrowRight':
				next();
				break;

			case 'ArrowLeft':
				prev();
				break;
		}
	}

	function next() {
		if (idx === data.length - 1) return;

		scrollUp();
		idx = idx + 1;
	}

	function prev() {
		if (idx === 0) return;

		scrollUp();
		idx = idx - 1;
	}

	function scrollUp() {
		element?.scrollTo({
			top: 0
		});
	}
</script>

<!-- Backdrop  -->
<div class="fixed top-0 right-0 left-0 z-10 grid h-full w-full place-items-center bg-black">
	<div bind:this={element} class="overflow-y-auto xl:w-300 w-full px-2 h-full grid">
		{#each [data[idx]] as img}
			<div class="relative">
				<img
					transition:fade={{ duration: 120 }}
					src={URL.createObjectURL(img.image)}
					alt={img.name}
					loading="lazy"
					class="size-full object-contain block"
				/>

				<!-- next button  -->
				<button
					onclick={next}
					type="button"
					class="absolute top-0 right-0 w-3/10 bg-transparent h-full"
					aria-label="next"
				>
				</button>

				<!-- previous button  -->
				<button
					onclick={prev}
					type="button"
					class="absolute top-0 left-0 w-3/10 bg-transparent h-full"
					aria-label="back"
				>
				</button>
			</div>
		{/each}
	</div>
</div>
