<script lang="ts">
	import Backdrop from './backdrop.svelte';
	import doujinData from '$lib/state/details.svelte.js';
	import ImagePreview from '$lib/components/modal/imagePreview.svelte';
	import Loading from '$lib/components/modal/loading.svelte';
	import db from '$lib/state/db.svelte';

	interface PropsType {
		images: string[];
		loading: boolean;
		onClose: () => void;
		code?: string;
	}

	let { images, onClose, loading, code }: PropsType = $props();

	let showSavedBtn = $state(true);

	function openWebsite() {
		const url = `https://nhentai.net/g/${code ?? doujinData.details!.data.id}/1`;

		(window as any).open(url, '_blank').focus();
	}

	async function savedToDB() {
		try {
			const d = {
				code: doujinData.details?.data.id!,
				imageUrls: images,
				name: doujinData.details?.data.title!,
				cover: images[0]
			};

			await db.add(d);

			showSavedBtn = false;
		} catch (err) {
			console.log(err);
		}
	}
</script>

<Backdrop {onClose}>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	{#if loading}
		<Loading />
	{:else}
		<div
			class="lg:w-[60rem] w-full h-full overflow-hidden flex flex-col bg-zinc-800"
			onclick={(e) => e.stopPropagation()}
		>
			<div class="flex items-center justify-between gap-2 px-3 py-4">
				<button aria-label="back" onclick={onClose} class="flex">
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
						<line x1="19" y1="12" x2="5" y2="12"></line>
						<polyline points="12 19 5 12 12 5"></polyline>
					</svg>
				</button>

				<div class="flex items-center gap-4">
					<!-- {#if showSavedBtn}
						{#await db.isPresent(doujinData.details!.data.id)}
							<div></div>
						{:then data}
							{#if !data}
								<button type="button" onclick={savedToDB}>Save</button>
							{/if}
						{/await}
					{/if} -->
					{#if db.isPresent(code ?? doujinData.details?.data.id!)}
						<button type="button" onclick={savedToDB}>Save</button>
					{/if}

					<button aria-label="open in website" onclick={openWebsite}>
						<svg
							viewBox="0 0 24 24"
							width="22"
							height="22"
							stroke="currentColor"
							stroke-width="2"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
							<polyline points="15 3 21 3 21 9"></polyline>
							<line x1="10" y1="14" x2="21" y2="3"></line>
						</svg>
					</button>
				</div>
			</div>

			<div class="h-full w-full overflow-auto grid gap-2">
				{#each images as image (image)}
					<ImagePreview {image} />
				{/each}
			</div>
		</div>
	{/if}
</Backdrop>
