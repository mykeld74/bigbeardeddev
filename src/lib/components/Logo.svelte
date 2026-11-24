<script lang="ts">
	// The mark is drawn with `currentColor`, so it inherits text color.
	import markRaw from '#lib/assets/logo-mark.svg?raw';

	let { size = 44, title = 'Big Bearded Dev' }: { size?: number; title?: string } = $props();
</script>

<span class="logo" style="--size:{size}px" role="img" aria-label={title}>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html markRaw}
</span>

<style>
	.logo {
		display: block;
		width: calc(var(--size) * 0.553); /* 399 / 721 */
		height: var(--size);
		color: inherit;
	}

	.logo :global(svg) {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
