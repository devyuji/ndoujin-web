<script lang="ts">
	import { pushState } from '$app/navigation';
	import { page } from '$app/state';
	import Container from '$lib/components/container.svelte';
	import ImagePreview from '$lib/components/modal/imagePreview.svelte';
	import Loading from '$lib/components/modal/loading.svelte';
	import Reader from '$lib/components/reader.svelte';
	import type { Setting } from '$lib/types/settings';
	import jszip from 'jszip';
	import { setContext } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	interface Image {
		image: Blob;
		name: string;
	}

	let file = $state<FileList>();
	let images = $state<Image[]>([]);
	let totalPages = $derived(images.length);
	let showDropperZone = $state(false);
	let fileName = $state('');
	let loading = $state(false);
	let imageIndex = $state(0);

	let settings = $state<Setting>({
		layout: 'horizontal',
		autoScroll: false,
		autoScrollTime: 5
	});
	let showTopIndicator = $state(false);

	const supportedExtenstion = ['png', 'jpg', 'webp', 'jpeg'];

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
		if ('launchQueue' in window) {
			window.launchQueue.setConsumer(async (launchParams) => {
				if (launchParams.files && launchParams.files.length) {
					const data = await launchParams.files[0].getFile();

					fileName = removeFileExtension(data.name);

					await processFile(data);
				}
			});
		}
	});

	$effect(() => {
		window.addEventListener('scroll', scrollDetect);

		return () => window.removeEventListener('scroll', scrollDetect);
	});

	function removeFileExtension(name: string): string {
		const n = name.split('.');

		return n[0];
	}

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

		fileName = removeFileExtension(file?.item(0)?.name!);

		await processFile(f);
	}

	async function processFile(data: ArrayBuffer | Blob) {
		loading = true;

		try {
			const response = await jszip.loadAsync(data);
			let allImage: Image[] = [];

			const imagesLength = Object.keys(response.files).length;

			let index = 0;
			await new Promise((resolve, _) => {
				response.forEach(async (_, file) => {
					const fileName = file.name;
					const img = await file.async('blob');

					const fileExtension = getFileExtension(fileName);

					let a = supportedExtenstion.find((ex) => ex === fileExtension);

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

	function getFileExtension(name: string): string {
		let n = name.split('.').at(-1);

		if (!n) throw new Error('unable to get extension');

		return n;
	}

	function openReading(index: number) {
		imageIndex = index;

		pushState('', {
			readerModal: true
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

	async function onDrop(e: DragEvent) {
		showDropperZone = false;

		e.preventDefault();

		if (!e.dataTransfer) return;

		const files = [...e.dataTransfer.items].map((item) => item.getAsFile()).filter((file) => file);

		if (files.length < 1) {
			showDropperZone = false;
			return;
		}
		let fileExtension = getFileExtension(files[0]?.name!);

		if (fileExtension !== 'cbz') {
			return;
		}

		fileName = removeFileExtension(files[0]?.name!);

		const f = await files[0]?.arrayBuffer();

		if (!f) return;

		await processFile(f);
	}
</script>

<svelte:window
	ondrop={onDrop}
	ondragover={(e) => {
		if (!e.dataTransfer) return;

		const fileItems = [...e.dataTransfer.items].filter((item) => item.kind === 'file');
		if (fileItems.length > 0) {
			e.preventDefault();

			showDropperZone = true;
		}
	}}
/>

<svelte:head>
	<title>Web Comic Reader (CBZ) - ndoujin</title>
	<meta name="description" content="Read comic book online by just uploading cbz file to it." />
</svelte:head>

<main class="grid place-items-center">
	<Container class="space-y-6">
		<div class="grid place-items-center border-2 border-dashed border-gray-200 rounded-xl">
			<div
				role="presentation"
				ondrop={onDrop}
				ondragover={(e) => {
					if (!e.dataTransfer) return;

					const fileItems = [...e.dataTransfer.items].filter((item) => item.kind === 'file');
					if (fileItems.length > 0) {
						e.preventDefault();
					}
				}}
				ondragleave={() => {
					showDropperZone = false;
				}}
				class="size-full"
			>
				<label
					for="file-upload"
					class={`w-full p-6 text-center grid place-items-center cursor-pointer ${showDropperZone ? 'h-50 bg-blue-500/50 ' : ''}`}
				>
					Drop CBZ file here, or click to upload.
					<input
						id="file-upload"
						onchange={submit}
						bind:files={file}
						multiple={false}
						accept=".cbz"
						type="file"
						class="hidden"
					/>
				</label>
			</div>
		</div>

		{#if loading}
			<div transition:fade={{ duration: 150 }} class="text-center">
				<Loading />
			</div>
		{:else if totalPages < 1}
			<div></div>
		{:else}
			<div class="space-y-1">
				<p class="text-lg font-semibold uppercase">{fileName}</p>
				<p>Total Pages: {totalPages}</p>
			</div>
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

			<!--------------------------------- FAQ scroll to top  ----------------------------->
			{#if showTopIndicator}
				<div class="flex justify-center sticky bottom-10 z-5 pointer-events-none">
					<button
						transition:fly={{ y: 10, duration: 220 }}
						onclick={scrollToTop}
						type="button"
						aria-label="scroll top"
						class="bg-gray-darker rounded-xl p-3 pointer-events-auto shadow-[rgba(0,0,0,0.24)_0px_3px_8px]"
					>
						<svg
							viewBox="0 0 24 24"
							width="30"
							height="30"
							stroke="currentColor"
							stroke-width="2"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg
						>
					</button>
				</div>
			{/if}
			<!---------------------------------------- FAQ ------------------------------------------>
		{/if}
	</Container>
</main>

{#if page.state.readerModal}
	<Reader bind:settings bind:index={imageIndex} onClose={closeReading} />
{/if}
