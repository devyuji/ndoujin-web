<script lang="ts">
	import type { Setting } from '$lib/types/settings';
	import { fly } from 'svelte/transition';
	import Backdrop from './backdrop.svelte';
	import { linear } from 'svelte/easing';

	interface Props {
		settings: Setting;
	}

	let { settings = $bindable() }: Props = $props();

	$effect(() => {
		localStorage.setItem('reader-setting', JSON.stringify(settings));
	});

	function closeModal() {
		history.back();
	}
</script>

<Backdrop onClose={closeModal} onKeyPressedClose={false} class="flex justify-center items-end">
	<div
		transition:fly={{ y: 20, duration: 250, easing: linear }}
		role="presentation"
		onclick={(e) => e.stopPropagation()}
		class="p-6 bg-gray-darker rounded-t-xl flex flex-col gap-2 items-start w-80"
	>
		<div class="flex justify-end w-full mb-2">
			<button type="button" aria-label="close" onclick={closeModal}>
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

		<!-- layout option  -->
		<div class="flex items-center justify-between w-full">
			<span>
				<p class="font-medium text-lg">Layout</p>
			</span>

			<span class="ml-auto">
				<select name="layout" id="layout" bind:value={settings.layout}>
					<option value="vertical">Vertical</option>
					<option value="horizontal">Horizontal</option>
				</select>
			</span>
		</div>

		<!-- auto scroll toggle  -->
		<div class="flex items-center justify-between w-full">
			<span>
				<p class="font-medium text-lg" id="autoscroll">Auto Scroll</p>
			</span>

			<span>
				<input
					bind:checked={settings.autoScroll}
					disabled={settings.layout === 'vertical'}
					type="checkbox"
					name="autoscroll"
					id="autoscroll"
				/>
			</span>
		</div>

		<!-- auto scroll time  -->
		<div class="flex items-center justify-between w-full">
			<span>
				<p class="font-medium text-lg" id="autoscroll">Auto Scroll Time</p>
			</span>

			<span>
				<select bind:value={settings.autoScrollTime} name="autoScrollTime" id="autoScrollTime">
					<option value={1}>1 sec.</option>
					<option value={2}>2 sec.</option>
					<option value={3}>3 sec.</option>
					<option value={4}>4 sec.</option>
					<option value={5}>5 sec.</option>
					<option value={6}>6 sec.</option>
					<option value={7}>7 sec.</option>
					<option value={8}>8 sec.</option>
					<option value={9}>9 sec.</option>
					<option value={10}>10 sec.</option>
				</select>
			</span>
		</div>
	</div>
</Backdrop>
