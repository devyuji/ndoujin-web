<script lang="ts">
	import type { DetailsType } from '$lib/state/details.svelte';
	import Tag from './tag.svelte';
	import DoujinData from '$lib/state/details.svelte';
	import firebase from '$lib/state/firebase.svelte';
	import { goto } from '$app/navigation';
	import Reading from './modal/reading.svelte';
	import Loading from './modal/loading.svelte';

	interface PropsType {
		data: DetailsType;
	}

	interface PreviewType {
		id: string;
		imageUrl: string[];
	}

	let { data }: PropsType = $props();

	let preview = $state<PreviewType>();
	let loading = $state(false);
	let show = $state(false);

	async function read() {
		// const url = `https://nhentai.net/g/${DoujinData.details!.data.id}/1`;

		// (window as any).open(url, '_blank').focus();

		if (!firebase.user) goto('/login');

		try {
			if (preview && preview?.id === DoujinData.details?.data.id) {
				show = true;
				return;
			}

			loading = true;

			const options: RequestInit = {
				method: 'POST',
				body: JSON.stringify({ id: DoujinData.details?.data.id }),
				headers: {
					'Content-Type': 'application/json'
				}
			};

			const res = await fetch('/api/read', options);

			const data = await res.json();

			preview = { id: DoujinData.details?.data.id!, imageUrl: data.data };
			show = true;
		} catch (err) {
			console.log(err);
		} finally {
			loading = false;
		}
	}

	function download() {}
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
		{#each data.tag as tag, index (index)}
			<Tag name={tag} />
		{/each}
	</div>

	<!-- action button  -->
	<div class="flex justify-end gap-2">
		<button class="bg-red-600 px-3 py-2 rounded-md" onclick={read}>Read</button>

		<button
			class="bg-red-600 px-3 py-2 rounded-md disabled:bg-red-600/30"
			disabled
			onclick={download}>Download</button
		>
	</div>
</div>

{#if loading}
	<Loading />
{/if}

{#if show}
	<Reading
		images={preview!.imageUrl}
		onClose={() => {
			show = false;
		}}
	/>
{/if}
