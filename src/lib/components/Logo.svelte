<script lang="ts">
	// The mark is inlined because it is drawn with `currentColor` and needs to
	// inherit text colour. The full-colour version has fixed colours, so it is
	// referenced by URL instead — one cached file rather than 27KB inlined
	// into every component that shows it.
	import markRaw from '#lib/assets/logo-mark.svg?raw';
	import colorUrl from '#lib/assets/logo-color.svg';

	let {
		size = 44,
		title = 'Big Bearded Dev',
		variant = 'mark'
	}: { size?: number; title?: string; variant?: 'mark' | 'color' } = $props();
</script>

{#if variant === 'color'}
	<img
		class="logo logoImage"
		src={colorUrl}
		alt={title}
		width="404"
		height="710"
		style="--size:{size}px"
	/>
{:else}
	<span class="logo logoMark" style="--size:{size}px" role="img" aria-label={title}>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html markRaw}
	</span>
{/if}

<style>
	.logo {
		display: block;
		height: var(--size);
	}

	.logoMark {
		width: calc(var(--size) * 0.553); /* 399 / 721 */
		color: inherit;
	}

	.logoMark :global(svg) {
		width: 100%;
		height: 100%;
		display: block;
	}

	.logoImage {
		width: auto; /* 404 / 710, kept by the intrinsic ratio */
	}
</style>
