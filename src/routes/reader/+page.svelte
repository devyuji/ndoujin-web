<script lang="ts">
	import { goto, pushState } from '$app/navigation';
	import { page } from '$app/state';
	import Container from '$lib/components/container.svelte';
	import ImagePreview from '$lib/components/modal/imagePreview.svelte';
	import Loading from '$lib/components/modal/loading.svelte';
	import Reader from '$lib/components/reader.svelte';
	import jszip from 'jszip';
	import { setContext } from 'svelte';

	interface Image {
		image: Blob;
		name: string;
	}

	let file = $state<FileList>();
	let images = $state<Image[]>([]);
	let loading = $state(false);
	let toggleReader = $state(false);
	let imageIndex = $state(0);

	$effect(() => {
		setContext('reader-data', images);
	});

	async function submit() {
		const f = await file?.item(0)?.arrayBuffer();

		if (!f) return;

		loading = true;

		try {
			const response = await jszip.loadAsync(f);
			let allImage: Image[] = [];

			const extenstion = ['png', 'jpg', 'webp', 'jpeg'];

			const imagesLength = Object.keys(response.files).length;

			let index = 0;
			await new Promise((resolve, _) => {
				response.forEach(async (_, file) => {
					const fileName = file.name;
					const img = await file.async('blob');

					const fileExtension = fileName.split('.').at(-1);

					let a = extenstion.find((ex) => ex === fileExtension);

					if (a) {
						allImage.push({
							image: img,
							name: fileName
						});
					}

					if (index === imagesLength - 1) {
						resolve(0);
					}

					index++;
				});
			});

			allImage.sort((a, b) => {
				return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
			});

			images = allImage;
		} catch (err) {
			console.log(err);
		}

		loading = false;
	}

	function openReading(index: number) {
		imageIndex = index;

		// goto(`/reader/view?index=${index}`);

		pushState('', {
			readerModal: true
		});
	}

	function closeReading() {
		toggleReader = false;

		history.back();
	}
</script>

<svelte:head>
	<title>Web Comic Reader - cbz</title>
	<meta name="description" content="Read comic book reader by just uploading cbz file to it." />
</svelte:head>

<main class="grid place-items-center">
	<Container class="space-y-6">
		<div class="grid place-items-center border-2 border-dashed border-gray-200 rounded-xl">
			<input
				onchange={submit}
				bind:files={file}
				multiple={false}
				accept=".cbz"
				type="file"
				class="w-full p-4 text-center"
			/>
		</div>

		{#if loading}
			<div class="text-center">
				<Loading />
			</div>
		{:else}
			<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
				{#each images as data, index (index)}
					<button
						type="button"
						onclick={() => openReading(index)}
						class="border-none hover:scale-105 transition-transform cursor-pointer"
					>
						<ImagePreview image={URL.createObjectURL(data.image)} />
					</button>
				{/each}
			</div>
		{/if}
	</Container>
</main>

{#if page.state.readerModal}
	<Reader index={imageIndex} onClose={closeReading} />
{/if}
