<script lang="ts">
	import type { DetailsType } from '$lib/state/details.svelte';
	import Tag from './tag.svelte';
	import DoujinData from '$lib/state/details.svelte';
	import firebase from '$lib/state/firebase.svelte';
	import { goto } from '$app/navigation';

	interface PropsType {
		data: DetailsType;
	}

	let { data }: PropsType = $props();

	function read() {
		const url = `https://nhentai.net/g/${DoujinData.details!.data.id}/1`;

		(window as any).open(url, '_blank').focus();
	}

	function download() {
		if (!firebase.user) {
			goto('/login');
			return;
		}
	}
</script>

<div class="mt-10 grid gap-4">
	<div class="flex gap-2 sm:flex-row flex-col">
		<div class="max-h-72 bg-zinc-900">
			<img
				src={`data:image/jpeg;base64,${data.coverImage}`}
				alt=""
				class="w-full h-full object-contain"
			/>
		</div>

		<div class="grid">
			<div class="flex flex-col gap-3 text-lg">
				<h2 class="font-semibold text-2xl">{data.title}</h2>

				<p>Pages: {data.totalPage}</p>

				<p class="capitalize">Language: {data.language}</p>

				<p class="capitalize">
					Artist: {#each data.artists as artist}
						<span>{artist}</span>
					{/each}
				</p>

				<p class="capitalize">ID: {data.id}</p>
			</div>
		</div>
	</div>

	<div class="flex flex-wrap gap-4">
		{#each data.tag as tag}
			<Tag name={tag} />
		{/each}
	</div>

	<!-- action button  -->
	<div class="flex justify-end gap-2">
		<button class="bg-red-600 px-3 py-2 rounded-md" onclick={read}>Read</button>

		<button class="bg-red-600 px-3 py-2 rounded-md" onclick={download}>Download</button>
	</div>
</div>
