<script lang="ts">
	import { resolve } from '$app/paths';
	import Seo from '#lib/components/Seo.svelte';
	import ProjectCard from '#lib/components/ProjectCard.svelte';
	import LogoColor from '#lib/components/LogoColor.svelte';
	import { featuredProjects } from '#lib/data/projects';
	import { services, skillGroups } from '#lib/data/services';
	import { site, yearsExperience } from '#lib/data/site';
</script>

<Seo />

<!-- ================= hero ================= -->
<section class="hero">
	<div class="wrap heroGrid">
		<div class="heroCopy">
			<p class="eyebrow">{site.role} · {site.location}</p>
			<h1>
				I build websites<br />
				<span class="accent">from scratch.</span>
			</h1>
			<p class="lead">
				I'm Mike — the big bearded dev. For {yearsExperience} years I've been building fast, accessible
				sites for small businesses, churches and nonprofits. No page builders, no bloated themes. Just
				careful code that loads quickly and keeps working.
			</p>
			<div class="heroCtas">
				<a class="btn btnPrimary" href={resolve('/contact')}>Start a project</a>
				<a class="btn btnGhost" href={resolve('/work')}>See the work</a>
			</div>

			<dl class="stats">
				<div>
					<dt>Years building</dt>
					<dd>{yearsExperience}</dd>
				</div>
				<div>
					<dt>Longest client</dt>
					<dd class="dense">{site.longestClient}</dd>
				</div>
				<div>
					<dt>Primary stack</dt>
					<dd class="dense">Svelte&nbsp;5</dd>
				</div>
			</dl>
		</div>

		<div class="heroArt drift">
			<LogoColor />
		</div>
	</div>
</section>

<!-- ================= what I do ================= -->
<section class="section" id="what">
	<div class="wrap">
		<header class="sectionHead reveal">
			<p class="eyebrow">What I do</p>
			<h2>Four things, done properly</h2>
			<p class="lead prose">
				Most of my work is one of these, and often two or three together. If what you need isn't
				here, ask anyway — I'll tell you straight if it isn't a fit.
			</p>
		</header>

		<ul class="serviceGrid revealRow" role="list">
			{#each services as service (service.title)}
				<li class="card serviceCard reveal">
					<h3>{service.title}</h3>
					<p>{service.summary}</p>
					<ul class="ticks" role="list">
						{#each service.points as point (point)}
							<li>{point}</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>

		<p class="sectionFoot">
			<a class="textLink" href={resolve('/services')}>How I work, in detail &rarr;</a>
		</p>
	</div>
</section>

<!-- ================= featured work ================= -->
<section class="section altSection" id="work">
	<div class="wrap">
		<header class="sectionHead reveal">
			<p class="eyebrow">Selected work</p>
			<h2>Sites currently in the wild</h2>
			<p class="lead prose">
				Every one of these is live and in use by a real business or organization. Most I still
				maintain.
			</p>
		</header>

		<ul class="workGrid revealRow" role="list">
			{#each featuredProjects as project, i (project.slug)}
				<li class="reveal"><ProjectCard {project} priority={i === 0} /></li>
			{/each}
		</ul>

		<p class="sectionFoot">
			<a class="btn btnGhost" href={resolve('/work')}>See more work</a>
		</p>
	</div>
</section>

<!-- ================= stack ================= -->
<section class="section" id="stack">
	<div class="wrap stackLayout">
		<div class="reveal">
			<p class="eyebrow">The toolbox</p>
			<h2>Old developer, current tools</h2>
			<div class="prose">
				<p>
					Svelte 5 with runes is my daily driver, on a foundation of plain HTML, CSS and JavaScript
					I understand rather than just configure. I've been writing for the web since 2012 — long
					enough to have watched a few “this changes everything” frameworks arrive and leave again.
				</p>
				<p>
					So I pick boring and durable where it matters, and the sharp new thing where it earns its
					place. That's why sites I built years ago still run.
				</p>
			</div>
			<p class="sectionFoot">
				<a class="textLink" href={resolve('/about')}>More about me &rarr;</a>
			</p>
		</div>

		<div class="skillCols reveal">
			{#each skillGroups as group (group.label)}
				<div class="skillGroup">
					<h3>{group.label}</h3>
					<ul role="list">
						{#each group.items as item (item)}
							<li>{item}</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ================= cta ================= -->
<section class="section">
	<div class="wrap">
		<div class="card ctaCard reveal">
			<div>
				<h2>Need a site that works?</h2>
				<p class="lead">
					Tell me about your business and what you're trying to do. I'll tell you honestly whether I
					can help, what it would take, and what it would cost.
				</p>
			</div>
			<div class="ctaActions">
				<a class="btn btnPrimary" href={resolve('/contact')}>Get in touch</a>
				<a class="btn btnGhost" href="mailto:{site.email}" rel="external">Email me directly</a>
			</div>
		</div>
	</div>
</section>

<style>
	/* --- hero ------------------------------------------------------------ */
	.hero {
		padding-block: clamp(3rem, 1rem + 7vw, 7rem) clamp(3rem, 1rem + 5vw, 5.5rem);
	}

	.heroGrid {
		display: grid;
		gap: clamp(2.5rem, 1rem + 5vw, 4rem);
		align-items: center;
	}

	h1 {
		font-size: var(--stepHero);
		font-weight: 700;
		margin-bottom: 1.5rem;
	}

	.accent {
		background: linear-gradient(100deg, var(--blue300), var(--copper300));
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	.heroCopy .lead {
		max-width: 46ch;
	}

	.heroCtas {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 2rem;
	}

	.stats {
		display: flex;
		flex-wrap: wrap;
		gap: 1.5rem 2.75rem;
		margin: 3rem 0 0;
		padding-top: 2rem;
		border-top: 1px solid var(--border);
	}

	.stats dt {
		font-family: var(--fontMono);
		font-size: var(--stepXs);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--textFaint);
		margin-bottom: 0.3rem;
	}

	.stats dd {
		margin: 0;
		font-family: var(--fontDisplay);
		font-size: clamp(1.9rem, 1.5rem + 1.4vw, 2.5rem);
		font-weight: 600;
		line-height: 1;
		color: var(--text);
	}

	.stats .dense {
		font-size: clamp(1.5rem, 1.2rem + 1vw, 2rem);
	}

	.heroArt {
		justify-self: center;
		max-width: 20rem;
		filter: drop-shadow(0 24px 48px rgb(0 0 0 / 0.55));
	}

	/* Below the two-column breakpoint the full figure is 560px tall — most of
	   a phone screen, sitting between the stats and the next section. Take it
	   out of flow instead: oversized, faded, bleeding off the right edge
	   behind the copy. Costs no vertical space and the eyes still track.

	   Positioned with inset rather than translate on purpose: `.drift` on this
	   same element animates `translate`, so using it here would fight. */
	@media (max-width: 55.9375rem) {
		/* Clip rather than hidden: it contains the bleed without turning the
		   section into a scroll container. */
		.hero {
			overflow-x: clip;
		}

		.heroGrid {
			position: relative;
		}

		.heroCopy {
			position: relative;
			z-index: 1;
		}

		.heroArt {
			position: absolute;
			bottom: 0;
			right: calc(var(--gutter) * -1.5);
			z-index: 0;
			width: min(72vw, 20rem);
			max-width: none;
			opacity: 0.16;
			filter: none;
			pointer-events: none;
			/* Fade the leading edge so it never crowds the text it sits behind. */
			mask-image: linear-gradient(to left, rgb(0 0 0) 35%, transparent 95%);
		}
	}

	@media (min-width: 56rem) {
		.heroGrid {
			grid-template-columns: 1.35fr 0.65fr;
		}

		.heroArt {
			max-width: 24rem;
		}
	}

	/* --- section furniture ----------------------------------------------- */
	.sectionHead {
		margin-bottom: clamp(2rem, 1rem + 3vw, 3.5rem);
	}

	.sectionHead .lead {
		margin-top: 1rem;
	}

	.sectionFoot {
		margin-top: clamp(2rem, 1rem + 2vw, 3rem);
	}

	.altSection {
		position: relative;
		background: color-mix(in oklab, var(--base800) 55%, transparent);
		border-block: 1px solid var(--border);
	}

	.textLink {
		font-family: var(--fontBody);
		font-weight: 600;
		font-size: var(--stepSm);
		color: var(--accentStrong);
		text-decoration: none;
		transition: color 0.25s var(--ease);
	}

	.textLink:hover {
		color: var(--text);
		text-decoration: underline;
	}

	/* --- services -------------------------------------------------------- */
	.serviceGrid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1rem, 0.5rem + 1.5vw, 1.75rem);
		margin: 0;
		padding: 0;
	}

	@media (min-width: 44rem) {
		.serviceGrid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.serviceCard {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		padding: clamp(1.5rem, 1rem + 1.5vw, 2.25rem);
	}

	.serviceCard p {
		font-size: var(--stepSm);
		color: var(--textMuted);
	}

	.ticks {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin: 0.5rem 0 0;
		padding: 0;
	}

	.ticks li {
		position: relative;
		padding-left: 1.5rem;
		font-size: var(--stepSm);
		color: var(--textMuted);
	}

	.ticks li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.55em;
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
		background: var(--accent);
		opacity: 0.9;
	}

	/* --- work ------------------------------------------------------------ */
	.workGrid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1.25rem, 0.5rem + 2vw, 2rem);
		margin: 0;
		padding: 0;
	}

	.workGrid > li {
		display: flex;
	}

	@media (min-width: 46rem) {
		.workGrid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	/* --- stack ----------------------------------------------------------- */
	.stackLayout {
		display: grid;
		gap: clamp(2.5rem, 1rem + 4vw, 4rem);
	}

	/* The global reset zeroes heading margins, so this one needs its own
	   breathing room — the other sections set it via .lead or their own rule. */
	.stackLayout h2 {
		margin-bottom: 1.1rem;
	}

	.skillCols {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 11rem), 1fr));
		gap: 1.75rem 2rem;
		align-content: start;
	}

	.skillGroup h3 {
		font-family: var(--fontMono);
		font-size: var(--stepXs);
		font-weight: 500;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--accent);
		margin-bottom: 0.9rem;
		padding-bottom: 0.6rem;
		border-bottom: 1px solid var(--border);
	}

	.skillGroup ul {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		margin: 0;
		padding: 0;
	}

	.skillGroup li {
		font-size: var(--stepSm);
		color: var(--textMuted);
	}

	@media (min-width: 60rem) {
		.stackLayout {
			grid-template-columns: 1fr 1.05fr;
		}
	}

	/* --- cta ------------------------------------------------------------- */
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
