<script lang="ts">
	import Container from '$lib/components/container.svelte';
	import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
	import firebase from '$lib/state/firebase.svelte';
	import {goto} from "$app/navigation";

	let inputValues = $state({
		email: '',
		password: ''
	});

	let errorMessage = $state('');
	let isErrorMessage = $derived(errorMessage.length === 0);

	async function submit(e: SubmitEvent) {
		e.preventDefault();

		try {
			if (!isErrorMessage) {
				errorMessage = '';
			}

			await signInWithEmailAndPassword(
				firebase.auth!,
				inputValues.email,
				inputValues.password
			);

			await goto("/")

		} catch (err) {
			console.error(err);

			errorMessage = 'invalid credentials';
		}
	}

	function logout() {
		signOut(firebase.auth!);
	}
</script>

<main class="grid place-items-center">
	<Container width="md:max-w-[35rem]">
		{#if firebase.user}
			<div class="grid place-items-center gap-6">
				<h1 class="text-2xl font-semibold">Already logged in</h1>
				<button class="p-2 bg-red-600 rounded-lg" onclick={logout}>logout</button>
			</div>
		{:else}
			<div>
				<h1 class="text-center text-2xl">Login</h1>
			</div>

			<form onsubmit={submit} class="flex flex-col w-full gap-4 mt-10">
				<label for="email">Email</label>
				<input
					type="email"
					id="email"
					bind:value={inputValues.email}
					class="h-14 p-2 outline-none bg-transparent border-2 border-gray-200 rounded-lg"
					required
				/>
				<label for="password">Password</label>
				<input
					type="password"
					id="password"
					bind:value={inputValues.password}
					class="h-14 p-2 outline-none bg-transparent border-2 border-gray-200 rounded-lg"
					required
				/>

				{#if !isErrorMessage}
					<p class="text-red-500">{errorMessage}</p>
				{/if}

				<button type="submit" class="bg-red-600 text-gray-50 p-3 text-lg rounded-lg">Login</button>
			</form>
		{/if}
	</Container>
</main>
