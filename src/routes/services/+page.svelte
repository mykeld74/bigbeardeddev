<script lang="ts">
	import { resolve } from '$app/paths';
	import Seo from '#lib/components/Seo.svelte';
	import { services, processSteps } from '#lib/data/services';
	import { site } from '#lib/data/site';
</script>

<Seo
	title="Services"
	description="Custom websites, editable content, rebuilds and rescues, forms and checkout — what Mike Daugherty does and how he works."
/>

<section class="section pageHead">
	<div class="wrap">
		<p class="eyebrow">Services</p>
		<h1>What I do, and how I work</h1>
		<p class="lead prose">
			I'm one developer, not an agency, which means you talk to the person doing the work. No
			account manager relaying messages, no junior dev you never meet. That keeps things fast and
			honest, and it means I take on work I can actually do well.
		</p>
	</div>
</section>

<section class="section">
	<div class="wrap">
		<ul class="serviceList" role="list">
			{#each services as service, i (service.title)}
				<li class="serviceRow reveal">
					<p class="rowNum">{String(i + 1).padStart(2, '0')}</p>
					<div class="rowBody">
						<h2>{service.title}</h2>
						<p class="rowSummary">{service.summary}</p>
						<ul class="ticks" role="list">
							{#each service.points as point (point)}
								<li>{point}</li>
							{/each}
						</ul>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</section>

<section class="section altSection">
	<div class="wrap">
		<header class="sectionHead">
			<p class="eyebrow">The process</p>
			<h2>Four steps, no mystery</h2>
			<p class="lead prose">
				You'll know where the project stands at every point, and you'll see it working long before
				it goes live.
			</p>
		</header>

		<ol class="processGrid" role="list">
			{#each processSteps as step (step.n)}
				<li class="card processCard reveal">
					<span class="stepNum" aria-hidden="true">{step.n}</span>
					<h3>{step.title}</h3>
					<p>{step.body}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<section class="section">
	<div class="wrap twoCol">
		<div>
			<p class="eyebrow">Straight answers</p>
			<h2>Things people ask</h2>
		</div>
		<div class="faq">
			<details>
				<summary>What does a site cost?</summary>
				<p>
					It depends on how many pages there are, whether you need to edit content yourself, and
					whether anything has to connect to payments or bookings. Tell me what you're after and
					I'll give you a real number rather than a range designed to get a meeting.
				</p>
			</details>
			<details>
				<summary>How long does it take?</summary>
				<p>
					A straightforward business site is usually a few weeks. The part that sets the pace is
					almost always content — photos and copy. If you have those ready, it moves quickly.
				</p>
			</details>
			<details>
				<summary>Can I update the site myself?</summary>
				<p>
					Yes, if that's what you want. I wire the parts that change often into a content studio you
					log into, and I'll sit down and show you how it works. If you'd rather just send me
					changes, that's fine too.
				</p>
			</details>
			<details>
				<summary>Will you take over a site someone else built?</summary>
				<p>
					Often, yes. I've inherited plenty. I'll look at what's there and tell you honestly whether
					it's worth fixing or whether a rebuild will cost you less in the long run.
				</p>
			</details>
			<details>
				<summary>What happens after launch?</summary>
				<p>
					I'm still here. Several sites on my work page I've maintained for years, rebuilding them
					as the web has moved on. I don't disappear once the invoice clears.
				</p>
			</details>
			<details>
				<summary>Do you do design, or just code?</summary>
				<p>
					Both. I design the site around your content and then build it. You won't need to hire a
					separate designer, and you won't get a template with your logo dropped into it.
				</p>
			</details>
		</div>
	</div>
</section>

<section class="section">
	<div class="wrap">
		<div class="card ctaCard">
			<div>
				<h2>Let's talk about your project</h2>
				<p class="lead">
					A short description of your business and what you need is enough to start. No obligation,
					no sales sequence.
				</p>
			</div>
			<div class="ctaActions">
				<a class="btn btnPrimary" href={resolve('/contact')}>Get in touch</a>
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

	.sectionHead {
		margin-bottom: clamp(2rem, 1rem + 3vw, 3.5rem);
	}

	.sectionHead .lead {
		margin-top: 1rem;
	}

	.altSection {
		background: color-mix(in oklab, var(--base800) 55%, transparent);
		border-block: 1px solid var(--border);
	}

	/* --- service rows ----------------------------------------------------- */
	.serviceList {
		display: flex;
		flex-direction: column;
		margin: 0;
		padding: 0;
	}

	.serviceRow {
		display: grid;
		gap: 0.75rem 2.5rem;
		padding-block: clamp(2rem, 1rem + 2.5vw, 3rem);
		border-top: 1px solid var(--border);
	}

	.serviceRow:last-child {
		border-bottom: 1px solid var(--border);
	}

	.rowNum {
		font-family: var(--fontMono);
		font-size: var(--stepXs);
		letter-spacing: 0.16em;
		color: var(--accent);
		padding-top: 0.4em;
	}

	.rowBody h2 {
		font-size: var(--step3);
		margin-bottom: 0.9rem;
	}

	.rowSummary {
		max-width: 52ch;
		color: var(--textMuted);
	}

	.ticks {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
		gap: 0.6rem 1.5rem;
		margin: 1.5rem 0 0;
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
	}

	@media (min-width: 48rem) {
		.serviceRow {
			grid-template-columns: 4rem 1fr;
		}
	}

	/* --- process ---------------------------------------------------------- */
	.processGrid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1rem, 0.5rem + 1.5vw, 1.75rem);
		margin: 0;
		padding: 0;
	}

	@media (min-width: 40rem) {
		.processGrid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 66rem) {
		.processGrid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.processCard {
		padding: clamp(1.5rem, 1rem + 1.5vw, 2rem);
	}

	.stepNum {
		display: block;
		font-family: var(--fontMono);
		font-size: var(--stepXs);
		letter-spacing: 0.16em;
		color: var(--accent);
		margin-bottom: 1rem;
	}

	.processCard h3 {
		margin-bottom: 0.7rem;
	}

	.processCard p {
		font-size: var(--stepSm);
		color: var(--textMuted);
	}

	/* --- faq -------------------------------------------------------------- */
	.twoCol {
		display: grid;
		gap: clamp(2rem, 1rem + 3vw, 4rem);
		align-items: start;
	}

	.faq details {
		border-bottom: 1px solid var(--border);
	}

	.faq details:first-child {
		border-top: 1px solid var(--border);
	}

	.faq summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 1.15rem 0;
		font-family: var(--fontDisplay);
		font-size: var(--step1);
		font-weight: 600;
		cursor: pointer;
		list-style: none;
		transition: color 0.25s var(--ease);
	}

	.faq summary::-webkit-details-marker {
		display: none;
	}

	.faq summary::after {
		content: '+';
		font-family: var(--fontMono);
		font-size: 1.25rem;
		color: var(--accent);
		flex-shrink: 0;
		transition: rotate 0.25s var(--ease);
	}

	.faq details[open] summary::after {
		content: '\2212';
	}

	.faq summary:hover {
		color: var(--accentStrong);
	}

	.faq details p {
		padding-bottom: 1.35rem;
		max-width: 60ch;
		font-size: var(--stepSm);
		color: var(--textMuted);
	}

	@media (min-width: 56rem) {
		.twoCol {
			grid-template-columns: 0.75fr 1.25fr;
		}
	}

	/* --- cta -------------------------------------------------------------- */
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
