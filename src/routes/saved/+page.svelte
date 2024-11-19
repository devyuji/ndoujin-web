<script lang="ts">
	import Container from '$lib/components/container.svelte';
	import SavedCard from '$lib/components/savedCard.svelte';
	import db from '$lib/state/db.svelte';

	let loading = $state(true);

	$effect(() => {
		if (!db.loading) {
			fetchData();
		}
	});

	async function fetchData() {
		try {
			if (db.isDataEmpty) {
				await db.getAll();
			}
		} catch (err) {
			console.log(err);
		} finally {
			loading = false;
		}
	}
</script>

<main class="grid place-items-center">
	<Container>
		{#if loading}
			<p class="text-center">loading...</p>
		{/if}

		{#if db.isDataEmpty && !loading}
			<p class="text-center">You have't saved any data</p>
		{/if}

		<div class="grid gap-6 md:grid-cols-3 grid-cols-2">
			{#each db.data as d (d.code)}
				<SavedCard data={d} />
			{/each}
		</div>
	</Container>
</main>
