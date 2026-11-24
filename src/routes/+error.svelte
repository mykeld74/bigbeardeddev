<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import Seo from '#lib/components/Seo.svelte';

	const isMissing = $derived(page.status === 404);
</script>

<Seo title={isMissing ? 'Page not found' : 'Something went wrong'} noindex />

<section class="section errorSection">
	<div class="wrap inner">
		<p class="code">{page.status}</p>
		<h1>
			{#if isMissing}
				That page isn't here
			{:else}
				Something went wrong
			{/if}
		</h1>
		<p class="lead">
			{#if isMissing}
				The link may be out of date, or I may have moved something. Either way, the work and the
				contact form are a click away.
			{:else}
				{page.error?.message ?? 'An unexpected error occurred.'} Try again in a moment — and if it keeps
				happening, I'd genuinely like to know.
			{/if}
		</p>
		<div class="actions">
			<a class="btn btnPrimary" href={resolve('/')}>Back home</a>
			<a class="btn btnGhost" href={resolve('/work')}>See the work</a>
		</div>
	</div>
</section>

<style>
	.errorSection {
		display: grid;
		place-items: center;
		min-height: 60svh;
	}

	.inner {
		text-align: center;
		max-width: 44rem;
	}

	.code {
		font-family: var(--fontMono);
		font-size: var(--stepXs);
		letter-spacing: 0.2em;
		color: var(--accent);
		margin-bottom: 1rem;
	}

	h1 {
		font-size: var(--step4);
		margin-bottom: 1.25rem;
	}

	.lead {
		margin-inline: auto;
		max-width: 46ch;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		justify-content: center;
		margin-top: 2rem;
	}
</style>
