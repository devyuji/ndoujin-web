<script lang="ts">
	import { pushState } from '$app/navigation';
	import { page } from '$app/state';
	import Container from '$lib/components/container.svelte';
	import ImagePreview from '$lib/components/modal/imagePreview.svelte';
	import Loading from '$lib/components/modal/loading.svelte';
	import Settings from '$lib/components/modal/settings.svelte';
	import Reader from '$lib/components/reader.svelte';
	import type { Setting } from '$lib/types/settings';
	import jszip from 'jszip';
	import { setContext } from 'svelte';
	import { fade } from 'svelte/transition';

	interface Image {
		image: Blob;
		name: string;
	}

	let file = $state<FileList>();
	let images = $state<Image[]>([]);
	let loading = $state(false);
	let imageIndex = $state(0);
	let settings = $state<Setting>({
		layout: 'horizontal',
		autoScroll: false,
		autoScrollTime: 5
	});
	let showTopIndicator = $state(false);

	$effect(() => {
		const s = localStorage.getItem('reader-setting');

		if (!s) {
			localStorage.setItem('reader-setting', JSON.stringify(settings));
			return;
		}

		settings = JSON.parse(s);
	});

	$effect(() => {
		setContext('reader-data', images);
	});

	$effect(() => {
		window.addEventListener('scroll', scrollDetect);

		return () => window.removeEventListener('scroll', scrollDetect);
	});

	function scrollDetect() {
		const sy = window.scrollY;

		if (sy > 320) {
			showTopIndicator = true;
		} else {
			showTopIndicator = false;
		}
	}

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

		setTimeout(() => {
			loading = false;
		}, 10);
	}

	function openReading(index: number) {
		imageIndex = index;

		pushState('', {
			readerModal: true
		});
	}

	function openSetting() {
		pushState('', {
			showSetting: true
		});
	}

	function closeReading() {
		history.back();
	}

	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
</script>

<svelte:head>
	<title>Web Comic Reader (CBZ) - ndoujin</title>
	<meta name="description" content="Read comic book online by just uploading cbz file to it." />
</svelte:head>

<main class="grid place-items-center">
	<Container class="space-y-6">
		<!-- setting button  -->
		<div class="flex">
			<button
				onclick={openSetting}
				class="ml-auto cursor-pointer flex items-center gap-2"
				type="button"
			>
				<svg
					viewBox="0 0 24 24"
					width="15"
					height="15"
					stroke="currentColor"
					stroke-width="2"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					><circle cx="12" cy="12" r="3"></circle><path
						d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
					></path></svg
				>
				Setting</button
			>
		</div>

		<div class="grid place-items-center border-2 border-dashed border-gray-200 rounded-xl">
			<input
				onchange={submit}
				bind:files={file}
				multiple={false}
				accept=".cbz"
				type="file"
				class="w-full p-6 text-center"
			/>
		</div>

		{#if loading}
			<div transition:fade={{ duration: 250 }} class="text-center">
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
						<ImagePreview image={URL.createObjectURL(data.image)} name={data.name} />
					</button>
				{/each}
			</div>

			<!-- FAQ scroll to top  -->
			{#if showTopIndicator}
				<div class="flex justify-end sticky bottom-10 z-5 pointer-events-none">
					<button
						onclick={scrollToTop}
						type="button"
						aria-label="scroll top"
						class="bg-gray-darker rounded-xl p-3 pointer-events-auto"
					>
						<svg
							viewBox="0 0 24 24"
							width="24"
							height="24"
							stroke="currentColor"
							stroke-width="2"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg
						>
					</button>
				</div>
			{/if}
		{/if}
	</Container>
</main>

{#if page.state.readerModal}
	<Reader bind:settings bind:index={imageIndex} onClose={closeReading} />
{/if}

{#if page.state.showSetting}
	<Settings bind:settings />
{/if}
