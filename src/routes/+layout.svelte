<script lang="ts">
	import '#lib/styles/reset.css';
	import '#lib/styles/app.css';
	import favicon from '#lib/assets/favicon.svg';
	import Nav from '#lib/components/Nav.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import Ambient from '#lib/components/Ambient.svelte';
	import { site } from '#lib/data/site';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	const personSchema = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: site.owner,
		alternateName: site.name,
		jobTitle: site.role,
		email: `mailto:${site.email}`,
		url: site.url,
		sameAs: [site.links.github, site.links.agency],
		address: { '@type': 'PostalAddress', addressLocality: 'Lakewood', addressRegion: 'CO' },
		knowsAbout: ['Svelte', 'SvelteKit', 'JavaScript', 'TypeScript', 'Web accessibility', 'Sanity']
	};

	// Split so the literal closing tag never appears in this file, which would
	// otherwise terminate the script block early.
	const personSchemaTag =
		'<script type="application/ld+json">' + JSON.stringify(personSchema) + '</' + 'script>';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html personSchemaTag}
</svelte:head>

<a class="skipLink" href="#main">Skip to content</a>

<Ambient />

<div class="shell">
	<Nav />
	<main id="main">
		{@render children()}
	</main>
	<Footer />
</div>

<style>
	.shell {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		min-height: 100svh;
	}
</style>
