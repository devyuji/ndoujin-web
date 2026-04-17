<script lang="ts">
	import type { Setting } from '$lib/types/settings';
	import { getContext, tick } from 'svelte';
	import { fly } from 'svelte/transition';
	import ImagePreview from './modal/imagePreview.svelte';
	import { pushState } from '$app/navigation';
	import { page } from '$app/state';
	import Settings from './modal/settings.svelte';

	interface Props {
		index: number;
		settings: Setting;
		onClose: () => void;
	}

	let { index = $bindable(), settings = $bindable(), onClose }: Props = $props();

	let element: HTMLDivElement;
	let showSettings = $state(false);

	const data: any = getContext('reader-data') ?? [];
	const imageTracking: HTMLDivElement[] = $state(new Array(data.length));
	const totalPage: number = $derived(data.length);

	// scrolling to image when layout in vertical
	$effect(() => {
		if (settings.layout === 'horizontal') return;

		tick().then(() => {
			if (imageTracking[index]) {
				imageTracking[index].scrollIntoView({
					behavior: 'auto',
					block: 'start',
					inline: 'start'
				});
			}
		});
	});

	// Keep track of srolling page number
	$effect(() => {
		if (settings.layout === 'horizontal') return;

		let observation: IntersectionObserver;

		tick().then(() => {
			observation = new IntersectionObserver(
				(e) => {
					if (e[0].isIntersecting) {
						let element = e[0].target;
						let elementIndex = element.getAttribute('data-index');

						if (elementIndex) {
							index = Number.parseInt(elementIndex);
						}
					}
				},
				{
					threshold: 0.3
				}
			);

			for (let i = 0; i < data.length; i++) {
				observation.observe(imageTracking[i]);
			}
		});
	});

	$effect(() => {
		document.body.style.overflow = 'hidden';
		window.addEventListener('keydown', keyPressed);

		return () => {
			window.removeEventListener('keydown', keyPressed);

			document.body.style.overflow = 'auto';
		};
	});

	// auto scroll goes to next chapter
	$effect(() => {
		let interval;
		if (!settings.autoScroll) return;

		if (index === totalPage - 1) {
			if (interval) clearInterval(interval);
		}

		interval = setInterval(() => {
			next();
		}, settings.autoScrollTime * 1000);

		return () => {
			clearInterval(interval);
		};
	});

	function keyPressed(e: KeyboardEvent) {
		const key = e.key;

		switch (key) {
			case 'Q':
			case 'q':
			case 'Escape':
				onClose();
				break;

			case 'D':
			case 'd':
			case 'ArrowRight':
				next();
				break;

			case 'A':
			case 'a':
			case 'ArrowLeft':
				prev();
				break;
		}
	}

	function next() {
		if (index === totalPage - 1) return;
		if (settings.layout === 'vertical') return;

		index = index + 1;
		scrollUp();
	}

	function prev() {
		if (index === 0) return;
		if (settings.layout === 'vertical') return;

		index = index - 1;
		scrollUp();
	}

	function scrollUp() {
		element?.scrollTo({
			top: 0,
			behavior: 'instant'
		});
	}

	function changeLayout() {
		if (settings.layout === 'vertical') {
			settings.layout = 'horizontal';
		} else {
			settings.layout = 'vertical';
		}

		localStorage.setItem('reader-setting', JSON.stringify(settings));
	}

	function openSettingsModal() {
		pushState('', {
			readerModal: true,
			showSetting: true
		});
	}

	function closeSettingsModal() {
		history.back();
	}
</script>

{#snippet grid()}
	{#each [data[index]] as img (index)}
		<div class="relative">
			<!-- <img
				src={URL.createObjectURL(img.image)}
				alt={img.name}
				loading="lazy"
				class="size-full object-contain block"
			/> -->
			<ImagePreview image={URL.createObjectURL(img.image)} name={img.name} />

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
{/snippet}

{#snippet list()}
	<div class="space-y-4">
		{#each data as img, idx (idx)}
			<div data-index={idx} class="min-h-50 sm:min-h-100" bind:this={imageTracking[idx]}>
				<ImagePreview image={URL.createObjectURL(img.image)} name={img.name} />
			</div>
		{/each}
	</div>
{/snippet}

<!-- Backdrop  -->
<div
	class="fixed top-0 right-0 left-0 z-10 flex flex-col place-items-center h-full w-full bg-zinc-900"
>
	<div bind:this={element} class="overflow-y-auto xl:w-300 size-full px-2 grid">
		{#if settings.layout === 'horizontal'}
			{@render grid()}
		{:else}
			{@render list()}
		{/if}
	</div>

	<!-- floating menu -->
	<div class="py-1 flex flex-col items-center">
		<div class="flex items-center gap-4">
			<p>{index + 1} / {data.length}</p>
			<button onclick={openSettingsModal} type="button" class="cursor-pointer" aria-label="setting">
				<svg
					viewBox="0 0 24 24"
					width="15"
					height="15"
					stroke="currentColor"
					stroke-width="2"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					><circle cx="12" cy="12" r="3"></circle><path
						d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
					></path></svg
				>
			</button>
		</div>

		<!-- settings  -->
		{#if showSettings}
			<div
				transition:fly={{ y: 10, duration: 250 }}
				class="absolute bottom-10 z-109 p-4 rounded-xl right bg-gray-darker"
			>
				<ul class="space-y-2">
					<li>
						<button onclick={changeLayout} type="button" class="flex gap-1 items-center">
							Layout: {settings.layout}

							<span>
								<svg
									viewBox="0 0 24 24"
									width="16"
									height="16"
									stroke="currentColor"
									stroke-width="2"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
									><polyline points="7 13 12 18 17 13"></polyline><polyline points="7 6 12 11 17 6"
									></polyline></svg
								>
							</span>
						</button>
					</li>

					<li class="flex items-center w-full">
						<span>
							<p id="autoscroll">Auto Scroll</p>
						</span>

						<span class="ml-auto">
							<input
								bind:checked={settings.autoScroll}
								disabled={settings.layout === 'vertical'}
								type="checkbox"
								name="autoscroll"
								id="autoscroll"
							/>
						</span>
					</li>
				</ul>
			</div>
		{/if}
	</div>
</div>

{#if page.state.showSetting}
	<Settings bind:settings />
{/if}
