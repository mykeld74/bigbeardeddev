<script lang="ts">
	import { resolve } from '$app/paths';
	import Seo from '#lib/components/Seo.svelte';
	import ProjectCard from '#lib/components/ProjectCard.svelte';
	import { projects } from '#lib/data/projects';
	import { site } from '#lib/data/site';
</script>

<Seo
	title="Work"
	description="Live client websites built by Mike Daugherty — small businesses, churches, nonprofits and events, built in SvelteKit, Sanity and Stripe."
/>

<section class="section pageHead">
	<div class="wrap">
		<p class="eyebrow">Selected work</p>
		<h1>{projects.length} sites, all of them live</h1>
		<p class="lead prose">
			These aren't concepts or redesign exercises. Each one is a site a real business or
			organization depends on, and most of them I still look after. Click through and look around —
			that's the best way to judge the work.
		</p>
	</div>
</section>

<section class="section workSection">
	<div class="wrap">
		<ul class="workGrid" role="list">
			{#each projects as project, i (project.slug)}
				<li><ProjectCard {project} priority={i < 2} /></li>
			{/each}
		</ul>
	</div>
</section>

<section class="section">
	<div class="wrap">
		<div class="card ctaCard">
			<div>
				<h2>Want yours on this page?</h2>
				<p class="lead">
					Tell me what your business does and what the site needs to accomplish. I'll tell you
					honestly whether I'm the right fit.
				</p>
			</div>
			<div class="ctaActions">
				<a class="btn btnPrimary" href={resolve('/contact')}>Start a project</a>
				<a class="btn btnGhost" href="mailto:{site.email}" rel="external">Email me</a>
			</div>
		</div>
	</div>
</section>

<style>
	.pageHead {
		padding-block: clamp(3rem, 1.5rem + 5vw, 5.5rem) 0;
	}

	.pageHead h1 {
		font-size: var(--step4);
		margin-bottom: 1.25rem;
	}

	.workSection {
		padding-top: clamp(2.5rem, 1.5rem + 3vw, 4rem);
	}

	.workGrid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1.25rem, 0.5rem + 2vw, 2rem);
		margin: 0;
		padding: 0;
	}

	@media (min-width: 46rem) {
		.workGrid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 68rem) {
		.workGrid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.ctaCard {
		display: grid;
		gap: 2rem;
		padding: clamp(2rem, 1.25rem + 3vw, 3.5rem);
		background:
			radial-gradient(
				120% 140% at 0% 0%,
				color-mix(in oklab, var(--blue700) 45%, transparent),
				transparent 60%
			),
			var(--surface);
	}

	.ctaCard .lead {
		margin-top: 1rem;
		max-width: 48ch;
	}

	.ctaActions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		align-content: center;
	}

	@media (min-width: 54rem) {
		.ctaCard {
			grid-template-columns: 1.4fr auto;
			align-items: center;
		}
	}
</style>
