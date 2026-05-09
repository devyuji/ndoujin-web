<script lang="ts">
	import Backdrop from './backdrop.svelte';
	import { slide } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import Slider from '../slider.svelte';

	interface Props {
		index: number;
		totalPage: number;
	}

	let { totalPage, index = $bindable() }: Props = $props();

	function onClose() {
		history.back();
	}
</script>

<Backdrop
	{onClose}
	onKeyPressedClose={false}
	triggerOverflowSetting={false}
	class="bg-transparent backdrop-blur-none flex items-center flex-col justify-end"
>
	<div
		transition:slide={{ axis: 'y', duration: 350, easing: backOut }}
		class="bg-gray-darker p-4 rounded-t-xl w-9/10 sm:w-100 space-y-6"
		onclick={(e) => e.stopPropagation()}
		role="presentation"
	>
		<div class="flex justify-end w-full mb-2">
			<button type="button" aria-label="close" onclick={onClose}>
				<svg
					viewBox="0 0 24 24"
					width="20"
					height="20"
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

		<div class="w-full space-y-4">
			<div class="flex items-center justify-between">
				<p>{index + 1}</p>
				<p>{totalPage}</p>
			</div>

			<Slider max={totalPage - 1} bind:value={index} min={0} />
		</div>
	</div>
</Backdrop>
