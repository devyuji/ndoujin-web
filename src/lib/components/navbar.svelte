<script lang="ts">
	import Container from './container.svelte';
	import Attention from './modal/attention.svelte';

	let showDisclaimar = $state(false);

	function openModal() {
		showDisclaimar = true;
	}

	function closeModal() {
		showDisclaimar = false;
	}
</script>

<header class="grid place-items-center min-h-20">
	<Container class="flex items-center">
		<div>
			<a href="/" class="text-lg font-bold">ndoujin</a>
		</div>

		<nav class="ml-auto">
			<ul class="flex gap-4 items-center text-lg font-semibold">
				<li>
					<button onclick={openModal} class="flex items-center gap-2" aria-label="attention">
						<svg
							viewBox="0 0 24 24"
							width="20"
							height="20"
							stroke="currentColor"
							stroke-width="2"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
							><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"
							></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg
						>
					</button>
				</li>

				<li>
					<a href="/saved">saved</a>
				</li>
				<li>
					<a href="/login">login</a>
				</li>
			</ul>
		</nav>
	</Container>
</header>

{#if showDisclaimar}
	<Attention onClose={closeModal} />
{/if}
