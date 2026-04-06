<script lang="ts">
	import type { Setting } from '$lib/types/settings';
	import { getContext, tick } from 'svelte';
	import { fly } from 'svelte/transition';

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

	$effect(() => {
		document.body.style.overflow = 'hidden';
		window.addEventListener('keydown', keyPressed);
		element?.addEventListener('scroll', closeSettingWhenUsing);

		return () => {
			window.removeEventListener('keydown', keyPressed);
			element?.removeEventListener('scroll', closeSettingWhenUsing);

			document.body.style.overflow = 'auto';
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
		if (index === data.length - 1) return;
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

	function toggleSetting() {
		showSettings = !showSettings;
	}

	function closeSettingWhenUsing() {
		if (showSettings) toggleSetting();
	}
</script>

{#snippet grid()}
	{#each [data[index]] as img (index)}
		<div class="relative">
			<img
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
{/snippet}

{#snippet list()}
	<div class="space-y-4">
		{#each data as img, idx (idx)}
			<div data-index={idx} class="min-h-50 sm:min-h-100" bind:this={imageTracking[idx]}>
				<img
					src={URL.createObjectURL(img.image)}
					alt={img.name}
					class="w-full object-contain block"
					loading="lazy"
				/>
			</div>
		{/each}
	</div>
{/snippet}

<!-- Backdrop  -->
<div
	class="fixed top-0 right-0 left-0 z-10 flex flex-col place-items-center h-full w-full bg-black"
>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		bind:this={element}
		class="overflow-y-auto xl:w-300 size-full px-2 grid"
		onclick={closeSettingWhenUsing}
	>
		{#if settings.layout === 'horizontal'}
			{@render grid()}
		{:else}
			{@render list()}
		{/if}
	</div>

	<!-- floating menu -->
	<div class="py-1 flex flex-col items-center">
		<div class="flex items-center gap-4">
			<p>{settings.layout === 'horizontal' ? `${index + 1} /` : ''} {data.length}</p>
			<button onclick={toggleSetting} type="button" class="cursor-pointer" aria-label="setting">
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
				class="absolute bottom-10 z-109 p-4 rounded-xl right bg-gray-900"
			>
				<ul>
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
				</ul>
			</div>
		{/if}
	</div>
</div>
