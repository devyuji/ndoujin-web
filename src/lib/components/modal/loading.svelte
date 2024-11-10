<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

	<div onclick={e => e.stopPropagation()} class="text-gray-50">
		<div class="loading_container" in:fade={{ duration: 300 }} out:fade={{ duration: 300 }}>
			<!-- First SVG Circle with left-right animation -->
			<svg
				viewBox="0 0 24 24"
				width="24"
				height="24"
				stroke="currentColor"
				stroke-width="2"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<circle cx="12" cy="12" r="10"></circle>
			</svg>

			<!-- Second SVG with multiple circles, moving in opposite direction -->
			<svg
				class="icon"
				viewBox="0 0 24 24"
				width="24"
				height="24"
				stroke="currentColor"
				stroke-width="2"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<circle cx="12" cy="12" r="1"></circle>
				<circle cx="19" cy="12" r="1"></circle>
				<circle cx="5" cy="12" r="1"></circle>
			</svg>
		</div>
	</div>

<style>
	.loading_container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.icon {
		animation: move 0.75s linear infinite alternate;
	}

	/* First SVG moves to the right */
	.icon:nth-child(1) {
		animation-name: moveRight;
	}

	/* Second SVG moves to the left */
	.icon:nth-child(2) {
		animation-name: moveLeft;
	}

	/* Keyframes for first SVG animation */
	@keyframes moveRight {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(30px);
		}
	}

	/* Keyframes for second SVG animation */
	@keyframes moveLeft {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-20px);
		}
	}
</style>
