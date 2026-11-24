<script lang="ts">
	import { resolve } from '$app/paths';
	import Seo from '#lib/components/Seo.svelte';
	import logoColor from '#lib/assets/logo-color.svg';
	import { skillGroups } from '#lib/data/services';
	import { site, yearsExperience } from '#lib/data/site';
</script>

<Seo
	title="About"
	description="Mike Daugherty — front-end developer since 2012, after sixteen years working with troubled youth. Based in Lakewood, Colorado."
/>

<section class="section pageHead">
	<div class="wrap headGrid">
		<div>
			<p class="eyebrow">About me</p>
			<h1>Mike Daugherty</h1>
			<p class="lead">
				Front-end developer since 2012. Before that, sixteen years working with troubled youth —
				which turns out to be better preparation for this job than it sounds.
			</p>
		</div>
		<div class="portrait" aria-hidden="true">
			<img src={logoColor} alt="" width="404" height="710" />
		</div>
	</div>
</section>

<section class="section">
	<div class="wrap bioGrid">
		<article class="bio prose">
			<h2>Professionally</h2>
			<p>
				I'm a seasoned front-end developer — that's code for old — with {yearsExperience} years in the
				field, having moved into web development in 2012. Before that I spent sixteen years working with
				troubled youth. That career gave me a pretty unusual toolkit for this one: an understanding of
				how people actually behave, a lot of patience, and the habit of solving problems with whoever
				is in the room rather than waiting for ideal conditions.
			</p>
			<p>
				You may be doing the math and wondering how old this guy is. And while I'm old as developers
				go, the tech I use isn't. I've got a solid foundation in HTML, CSS and JavaScript, and on
				top of that I build the majority of my projects with Svelte and SvelteKit. I genuinely enjoy
				keeping up with where the web is going — new CSS, new framework features, the whole thing.
			</p>
			<p>
				What that adds up to in practice: I build custom sites rather than reaching for a page
				builder, and I care about the parts people don't see — how fast it loads, whether a screen
				reader can make sense of it, whether it still works in three years. Several of the sites on
				my work page I've maintained and rebuilt over the better part of a decade.
			</p>

			<h2>Personally</h2>
			<p>
				Outside of work I'm a dedicated family man. I've been married since 1998, and we raised
				three children who are now grown, out of the house, and killing it as adults. I'm also
				actively involved at my church, where I serve on the worship team playing both bass and
				acoustic guitar — not at the same time.
			</p>
			<p>
				That mix of professional experience, personal life and faith is a big part of why I work the
				way I do. A website is a technical thing built for human beings, and I've spent most of my
				adult life paying attention to the human end of that.
			</p>
		</article>

		<aside class="sidebar">
			<div class="card factCard">
				<h2 class="cardTitle">At a glance</h2>
				<dl>
					<div>
						<dt>Based in</dt>
						<dd>{site.location}</dd>
					</div>
					<div>
						<dt>Building sites since</dt>
						<dd>{site.since}</dd>
					</div>
					<div>
						<dt>Before this</dt>
						<dd>16 years with troubled youth</dd>
					</div>
					<div>
						<dt>Daily driver</dt>
						<dd>Svelte 5 &amp; SvelteKit</dd>
					</div>
					<div>
						<dt>Also plays</dt>
						<dd>Bass &amp; acoustic guitar</dd>
					</div>
				</dl>
			</div>

			<div class="card factCard">
				<h2 class="cardTitle">Toolbox</h2>
				{#each skillGroups as group (group.label)}
					<div class="skillBlock">
						<h3>{group.label}</h3>
						<p>{group.items.join(' · ')}</p>
					</div>
				{/each}
			</div>

			<div class="card factCard">
				<h2 class="cardTitle">Find me</h2>
				<ul class="findLinks" role="list">
					<li><a href="mailto:{site.email}" rel="external">{site.email}</a></li>
					<li>
						<a href={site.links.github} target="_blank" rel="external me noreferrer">GitHub</a>
					</li>
					<li>
						<a href={site.links.agency} target="_blank" rel="external noreferrer">MSD Web Pros</a>
					</li>
				</ul>
			</div>
		</aside>
	</div>
</section>

<section class="section altSection">
	<div class="wrap">
		<div class="ctaInner">
			<h2>Think we'd work well together?</h2>
			<p class="lead">
				I take on a handful of projects at a time so each one gets proper attention. If you've got
				something in mind, let's talk about it.
			</p>
			<div class="ctaActions">
				<a class="btn btnPrimary" href={resolve('/contact')}>Start a project</a>
				<a class="btn btnGhost" href={resolve('/work')}>See the work</a>
			</div>
		</div>
	</div>
</section>

<style>
	.pageHead {
		padding-block: clamp(3rem, 1.5rem + 5vw, 5.5rem) 0;
	}

	.headGrid {
		display: grid;
		gap: 2.5rem;
		align-items: center;
	}

	h1 {
		font-size: var(--step4);
		margin-bottom: 1.25rem;
	}

	.portrait {
		justify-self: center;
		max-width: 13rem;
		filter: drop-shadow(0 20px 40px rgb(0 0 0 / 0.5));
	}

	.portrait img {
		width: 100%;
		height: auto;
	}

	@media (min-width: 50rem) {
		.headGrid {
			grid-template-columns: 1fr auto;
		}

		.portrait {
			max-width: 15rem;
		}
	}

	/* --- bio -------------------------------------------------------------- */
	.bioGrid {
		display: grid;
		gap: clamp(2.5rem, 1rem + 4vw, 4rem);
		align-items: start;
	}

	.bio h2 {
		font-size: var(--step3);
		margin-bottom: 1.1rem;
	}

	.bio h2 + p {
		margin-top: 0;
	}

	.bio h2:not(:first-child) {
		margin-top: 3rem;
	}

	.bio p {
		color: var(--textMuted);
	}

	/* --- sidebar ---------------------------------------------------------- */
	.sidebar {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		position: sticky;
		top: 6rem;
	}

	.factCard {
		padding: 1.5rem;
	}

	.cardTitle {
		font-family: var(--fontMono);
		font-size: var(--stepXs);
		font-weight: 500;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--accent);
		margin-bottom: 1.25rem;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid var(--border);
	}

	.factCard dl {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
		margin: 0;
	}

	.factCard dt {
		font-size: var(--stepXs);
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--textFaint);
	}

	.factCard dd {
		margin: 0.15rem 0 0;
		font-size: var(--stepSm);
		font-weight: 500;
		color: var(--text);
	}

	.skillBlock + .skillBlock {
		margin-top: 1rem;
	}

	.skillBlock h3 {
		font-size: var(--stepXs);
		font-family: var(--fontBody);
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--textFaint);
		margin-bottom: 0.2rem;
	}

	.skillBlock p {
		font-size: var(--stepSm);
		color: var(--textMuted);
		line-height: 1.5;
	}

	.findLinks {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		margin: 0;
		padding: 0;
	}

	.findLinks a {
		font-size: var(--stepSm);
		color: var(--textMuted);
		text-decoration: none;
		overflow-wrap: anywhere;
		transition: color 0.25s var(--ease);
	}

	.findLinks a:hover {
		color: var(--accentStrong);
	}

	@media (min-width: 60rem) {
		.bioGrid {
			grid-template-columns: 1.6fr 0.95fr;
		}
	}

	/* --- cta -------------------------------------------------------------- */
	.altSection {
		background: color-mix(in oklab, var(--base800) 55%, transparent);
		border-block: 1px solid var(--border);
	}

	.ctaInner {
		max-width: var(--maxText);
	}

	.ctaInner .lead {
		margin-top: 1rem;
	}

	.ctaActions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 2rem;
	}
</style>
