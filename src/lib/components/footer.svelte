<script lang="ts">
	import Container from './container.svelte';

	const year = 2026;
</script>

<footer class="mt-auto grid place-items-center border-t-2 border-zinc-800">
	<Container class="grid place-items-center gap-2 text-center">
		<p class="text-zinc-500 text-sm">{year}</p>
	</Container>
</footer>
