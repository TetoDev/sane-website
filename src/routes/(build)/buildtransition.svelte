<script lang="ts">
	import { fly } from 'svelte/transition'

	export let url: URL
</script>

{#key url}
	<div
		in:fly={{ opacity: 0, duration: 350}}
	>
		<slot />
	</div>
{/key}
