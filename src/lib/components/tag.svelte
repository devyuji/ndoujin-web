<script lang="ts">
	interface PropsType {
		name: string;
	}

	let { name }: PropsType = $props();

	let textColor = $state('text-gray-50');

	const cw = ['rape', 'netorare'];

	$effect(() => {
		if (cw.indexOf(name.toLowerCase()) !== -1) {
			textColor = 'text-red-500';
		}
	});
</script>

<div class="border-2 border-red-500 p-2 rounded-md">
	<p class={`capitalize ${textColor}`}>{name}</p>
</div>
