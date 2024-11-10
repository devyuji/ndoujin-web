<script lang="ts">
	import Container from '$lib/components/container.svelte';
	import Loading from '$lib/components/modal/loading.svelte';
	import input from '$lib/state/input.svelte';
	import doujinData from '$lib/state/details.svelte';
	import { fly } from 'svelte/transition';
	import Result from '$lib/components/result.svelte';
	import Backdrop from '$lib/components/modal/backdrop.svelte';

	let errorMessage = $state('');
	let isErrorMessageEmpty = $derived(errorMessage.length == 0);
	let isValueEmpty = $derived(input.value.trim().length === 0);

	let loading = $state(false);

	function isValidURL(url: string) {
		try {
			new URL(url);
			return true;
		} catch (error) {
			return false;
		}
	}

	function extractId(url: string) {
		const match = url.match(/\/g\/(\d+)/);
		return match ? match[1] : null;
	}

	async function submit(e: SubmitEvent) {
		e.preventDefault();

		if (isValueEmpty) {
			errorMessage = 'input field is empty';
			return;
		}

		try {
			let code: string | null = input.value.trim();

			if (isValidURL(code)) {
				code = extractId(code);

				if (!code) {
					errorMessage = 'invalid url';
					return;
				}
			}

			if (doujinData.details?.hasData && input.value === doujinData.details.data.id) {
				return;
			}

			const config: RequestInit = {
				method: 'GET'
			};

			loading = true;
			if (!isErrorMessageEmpty) {
				errorMessage = '';
			}

			const response = await fetch(`/api/details?code=${code}`, config);

			if (!response.ok) {
				throw new Error('api error');
			}

			const data = await response.json();

			doujinData.update(data);

			loading = false;
		} catch (err) {
			console.error(err);
			errorMessage = 'Something went wrong!';
			loading = false;
		}
	}
</script>

<main class="grid place-items-center">
	<Container class="mt-10">
		<div>
			<h1 class="text-5xl font-medium text-center">Easiest way to use Nhentai!</h1>
		</div>

		<form
			onsubmit={submit}
			class="flex items-center mt-10 border-2 border-gray-200 rounded-lg p-4 gap-2"
		>
			<input
				type="text"
				bind:value={input.value}
				placeholder="eg. 344982"
				class="h-full w-full bg-transparent outline-none"
			/>

			<button type="submit" aria-label="submit" class="">
				<svg
					viewBox="0 0 24 24"
					width="24"
					height="24"
					stroke="currentColor"
					stroke-width="2"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"
					></polygon></svg
				>
			</button>
		</form>

		{#if !isErrorMessageEmpty}
			<div class="mt-2" transition:fly={{ y: 10, duration: 550, opacity: 0 }}>
				<p class="text-red-500">{errorMessage}</p>
			</div>
		{/if}

		{#if doujinData.details?.hasData}
			<Result data={doujinData.details?.data} />
		{/if}
	</Container>
</main>

{#if loading}
	<Backdrop onClose={() => {}}>
		<Loading />
	</Backdrop>
{/if}
