<script lang="ts">
	import Container from '$lib/components/container.svelte';
	import SavedCard from '$lib/components/savedCard.svelte';
	import db from '$lib/state/db.svelte';
	import type { SavedType } from '$lib/state/db.svelte';

	let loading = $state(true);
	let data = $state<SavedType[]>([]);

	$effect(() => {
		if (!db.loading) {
			fetchData();
		}
	});

	async function fetchData() {
		const d = await db.getAll();

		data = d;

		loading = false;
	}
</script>

<main class="grid place-items-center">
	<Container>
		{#if loading}
			<p class="text-center">loading...</p>
		{/if}

		<div class="grid grid-cols-4">
			{#each data as d (d.code)}
				<SavedCard data={d} />
			{/each}
		</div>
	</Container>
</main>
