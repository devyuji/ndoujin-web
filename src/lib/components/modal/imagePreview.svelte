<script lang="ts">
	interface PropsType {
		image: string;
	}

	let { image }: PropsType = $props();

	let imageLoaded = $state(false);
	let errorMessage = $state('');

	let imageEle: HTMLImageElement;
</script>

<div class="w-full h-full bg-zinc-700 relative">
	<div class={`h-96 w-full bg-zinc-700 grid place-items-center ${imageLoaded ? 'hidden' : ''}`}>
		{#if errorMessage}
			<!-- <button aria-label="retry"
				><svg
					viewBox="0 0 24 24"
					width="24"
					height="24"
					stroke="currentColor"
					stroke-width="2"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					><polyline points="23 4 23 10 17 10"></polyline><path
						d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"
					></path></svg
				></button
			> -->
			<p class="text-center">{errorMessage}</p>
		{:else}
			<span>
				<svg
					class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
			</span>
		{/if}
	</div>
	<img
		alt=""
		class="w-full h-full object-contain"
		onerror={() => (errorMessage = 'image not loaded')}
		onload={() => (imageLoaded = true)}
		src={image}
		bind:this={imageEle}
	/>
</div>
