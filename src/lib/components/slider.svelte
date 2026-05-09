<script lang="ts">
	import { tick } from 'svelte';

	interface Props {
		value: number;
		max: number;
		min?: number;
		step?: number;
	}

	let { value = $bindable(), max, min = 1, step = 1 }: Props = $props();

	let slider: HTMLElement, trackFill: HTMLElement, thumb: HTMLElement, indicator: HTMLElement;
	let isDragging = false;

	$effect(() => {
		tick().then(() => {
			let percentage = value / max;
			trackFill.style.width = `${percentage * 100}%`;
		});
	});

	function renderTicks(node: HTMLElement) {
		const numSteps = (max - min) / step;

		for (let i = 0; i <= numSteps; i++) {
			const bgTick = document.createElement('div');
			bgTick.className = 'w-1 h-1 opacity-0.2 rounded-full bg-gray-400';
			node.appendChild(bgTick);
		}
	}

	function updateSlider(clientX: number) {
		const rect = slider.getBoundingClientRect();
		let x = clientX - rect.left;
		x = Math.max(0, Math.min(x, rect.width));

		// 1. Calculate raw unstepped value
		const rawPercentage = x / rect.width;
		const rawValue = rawPercentage * (max - min) + min;

		// 2. Snap to nearest step
		const steppedValue = Math.round(rawValue / step) * step;

		// 3. Convert stepped value back to percentage
		const finalPercentage = (steppedValue - min) / (max - min);

		// Update DOM Elements
		trackFill.style.width = `${finalPercentage * 100}%`;
		thumb.style.left = `${finalPercentage * 100}%`;
		indicator.style.left = `${finalPercentage * 100}%`;

		// console.log(steppedValue);
		value = steppedValue;
	}

	function startDrag(e: any) {
		isDragging = true;
		// Add the class that triggers the CSS spring transitions
		slider.classList.add('is-active');

		const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
		updateSlider(clientX);
	}

	function doDrag(e: any) {
		if (!isDragging) return;
		if (e.cancelable) e.preventDefault();

		const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
		updateSlider(clientX);
	}

	function endDrag() {
		if (!isDragging) return;
		isDragging = false;
		// Remove the class, triggering the close transition
		slider.classList.remove('is-active');
	}
</script>

<svelte:window onmousemove={doDrag} onmouseup={endDrag} ontouchmove={doDrag} ontouchend={endDrag} />

<div
	role="presentation"
	class="slider-wrapper"
	bind:this={slider}
	onmousedown={startDrag}
	ontouchstart={startDrag}
>
	<div class="track-bg">
		<div class="ticks-container" {@attach renderTicks}></div>
	</div>

	<!-- Filled track with light ticks masked inside it -->
	<div class="track-fill" bind:this={trackFill}>
		<div class="ticks-wrapper">
			<div class="ticks-container-active" id="fill-ticks"></div>
		</div>
	</div>

	<div class="thumb" bind:this={thumb}></div>
	<div class="value-indicator" bind:this={indicator}>
		<span id="value-text">{value + 1}</span>
	</div>
</div>

<style>
	/* --- Slider Container --- */
	.slider-wrapper {
		position: relative;
		width: 100%;
		height: 15px;
		display: flex;
		align-items: center;
		cursor: pointer;
		touch-action: none;
	}

	/* --- Inactive Track --- */
	.track-bg {
		position: absolute;
		width: 100%;
		height: 16px;
		background-color: #e6e0e9;
		border-radius: 8px;
		overflow: hidden; /* Contains the ticks */
	}

	/* --- Tick Marks (Steps) --- */
	.ticks-container {
		position: absolute;
		width: 100%;
		height: 16px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 6px; /* Keeps dots inside the rounded ends */
		box-sizing: border-box;
		pointer-events: none;
		z-index: 1;
	}

	/* --- Active (Filled) Track --- */
	.track-fill {
		position: absolute;
		height: 16px;
		width: 0%; /* Initial value */
		background-color: oklch(45.5% 0.188 13.697);
		border-radius: 8px;
		pointer-events: none;
		z-index: 2;
		/* Smooth gliding between steps */
		transition: width 0.15s cubic-bezier(0.2, 0, 0, 1);
	}

	/* Ticks inside the filled area need to be light */
	.ticks-container-active {
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 6px;
		box-sizing: border-box;
	}

	:global(.ticks-container-active .tick) {
		background-color: #ffffff;
		opacity: 0.38;
	}

	/* Wrap the active ticks inside the track-fill so they get clipped */
	.track-fill .ticks-wrapper {
		position: absolute;
		width: 320px; /* Must match main wrapper width */
		height: 16px;
		left: 0;
		overflow: hidden;
	}

	/* --- Thumb --- */
	.thumb {
		position: absolute;
		width: 4px;
		height: 40px;
		background-color: #ffffff;
		border-radius: 2px;
		top: 50%;
		left: 40%;
		transform: translate(-50%, -50%);
		pointer-events: none;
		opacity: 0;
		z-index: 3;
		/* Gliding transition for steps */
		transition:
			left 0.15s cubic-bezier(0.2, 0, 0, 1),
			opacity 0.2s ease;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
	}

	:global(.slider-wrapper.is-active .thumb) {
		opacity: 1;
	}

	/* --- Value Indicator --- */
	.value-indicator {
		position: absolute;
		left: 40%;
		bottom: 32px;
		width: 44px;
		height: 44px;
		background-color: oklch(41% 0.159 10.272);
		border-radius: 50% 50% 50% 4px;
		transform: translateX(-60%) rotate(-45deg) scale(0);
		transform-origin: bottom left;
		display: flex;
		justify-content: center;
		align-items: center;
		pointer-events: none;
		z-index: 10;

		/* Combines scale (bounce) and left (gliding step) transitions */
		transition:
			transform 0.2s cubic-bezier(0.4, 0, 1, 1),
			left 0.15s cubic-bezier(0.2, 0, 0, 1);
	}

	:global(.slider-wrapper.is-active .value-indicator) {
		transform: translateX(-0%) rotate(-45deg) scale(1);
		transition:
			transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
			left 0.15s cubic-bezier(0.2, 0, 0, 1);
	}

	.value-indicator span {
		color: #ffffff;
		font-weight: 500;
		font-size: 14px;
		transform: rotate(45deg);
	}
</style>
